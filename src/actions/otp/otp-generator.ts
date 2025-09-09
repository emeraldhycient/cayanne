'use server';
import { generateAlphanumericOtp, generateNumericOtp, generateRandomizedHashOtp, prisma } from "@/lib";
import crypto from "crypto";
import bcrypt from "bcrypt";

export async function generateOtp(
    type: OtpType = "numeric",
    length: number = 6,
    expiresAt: Date = new Date(Date.now() + 5 * 60 * 1000), // Default 5 minutes
    externalClientId?: string
): Promise<{ otp: string; hashedOtp: string, storageId: number | string }> {
    if (length < 4) {
        throw new Error("Length must be between 4 and above.");
    }

    let actualType: OtpType = type;

    if (type === "random") {
        const types: OtpType[] = ["numeric", "alphanumeric", "hash"];
        actualType = types[crypto.randomInt(0, types.length)];
    }

    let otp: string;

    // Generate OTP based on type
    if (actualType === "numeric") {
        otp = generateNumericOtp(length);
    } else if (actualType === "alphanumeric") {
        otp = generateAlphanumericOtp(length);
    } else {
        otp = generateRandomizedHashOtp(length);
    }

    // Check if OTP already exists in database by comparing with recent OTPs
    // We'll check the last 100 OTPs to avoid collisions
    const recentOtps = await prisma.otp.findMany({
        where: {
            createdAt: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
            }
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
        select: { value: true }
    });

    // Check if the generated OTP matches any recent hashed OTP
    for (const existingOtp of recentOtps) {
        const isMatch = await bcrypt.compare(otp, existingOtp.value);
        if (isMatch) {
            // OTP collision detected, generate a new one
            return generateOtp(type, length, expiresAt, externalClientId);
        }
    }

    // Hash the OTP for secure storage
    const saltRounds = 12;
    const hashedOtp = await bcrypt.hash(otp, saltRounds);

    const savedOtp = await prisma.otp.create({
        data: {
            type: actualType,
            value: hashedOtp,
            expiresAt,
            clientId: externalClientId
        }
    });

    return { otp, hashedOtp, storageId: savedOtp.id };
}



// Example usage (commented out for production)
/*
(async () => {
    try {
        const result1 = await generateOtp("numeric", 4);
        console.log(result1); // e.g., { otp: "4829", hashedOtp: "$2b$12$..." }
        
        const result2 = await generateOtp("alphanumeric", 6);
        console.log(result2); // e.g., { otp: "a7B3xQ", hashedOtp: "$2b$12$..." }
        
        const result3 = await generateOtp("hash", 6);
        console.log(result3); // e.g., { otp: "c9f2a1", hashedOtp: "$2b$12$..." }
        
        const result4 = await generateOtp("random", 5);
        console.log(result4); // e.g., could be numeric, alphanumeric, or hash
    } catch (error) {
        console.error("Error generating OTP:", error);
    }
})();
*/
