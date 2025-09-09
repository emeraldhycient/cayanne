'use server';
import { generateOtpString, prisma, resolveOtpType } from "@/lib";
import bcrypt from "bcrypt";


/**
 * Checks if an OTP already exists in the database by comparing with recent OTPs
 */
async function isOtpDuplicate(otp: string): Promise<boolean> {
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

    for (const existingOtp of recentOtps) {
        const isMatch = await bcrypt.compare(otp, existingOtp.value);
        if (isMatch) {
            return true;
        }
    }
    return false;
}

/**
 * Stores the hashed OTP in the database
 */
async function storeOtp(
    type: Exclude<OtpType, "random">,
    hashedOtp: string,
    expiresAt: Date,
    clientId?: string
) {
    return await prisma.otp.create({
        data: {
            type,
            value: hashedOtp,
            expiresAt,
            clientId
        }
    });
}

/**
 * Generates a unique OTP and stores it in the database
 */
export async function generateOtp(
    type: OtpType = "numeric",
    length: number = 6,
    expiresAt: Date = new Date(Date.now() + 5 * 60 * 1000), // Default 5 minutes
    externalClientId?: string
): Promise<OtpGenerationResult> {
    if (length < 4) {
        throw new Error("Length must be 4 or above.");
    }

    const actualType = resolveOtpType(type);
    const otp = generateOtpString(actualType, length);

    // Check for duplicates and regenerate if necessary
    if (await isOtpDuplicate(otp)) {
        return generateOtp(type, length, expiresAt, externalClientId);
    }

    // Hash the OTP for secure storage
    const saltRounds = 12;
    const hashedOtp = await bcrypt.hash(otp, saltRounds);

    // Store in database
    const savedOtp = await storeOtp(actualType, hashedOtp, expiresAt, externalClientId);

    return { 
        otp, 
        hashedOtp, 
        storageId: savedOtp.id 
    };
}

/**
 * Verifies an OTP against the database and optionally clears it
 */
export async function verifyAndClearOtp(
    otp: string,
    clientId?: string,
    clearAfterVerification: boolean = true
): Promise<OtpVerificationResult> {
    try {
        // Find OTPs that match the clientId (if provided) and are not used
        const whereClause = {
            used: false,
            ...(clientId && { clientId })
        };

        const otpRecords = await prisma.otp.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            take: 10 // Limit to recent OTPs for performance
        });

        for (const record of otpRecords) {
            const isMatch = await bcrypt.compare(otp, record.value);
            
            if (isMatch) {
                const now = new Date();
                const isExpired = now > record.expiresAt;

                if (isExpired) {
                    // Mark as used even if expired to prevent reuse
                    if (clearAfterVerification) {
                        await prisma.otp.update({
                            where: { id: record.id },
                            data: { used: true }
                        });
                    }
                    
                    return {
                        isValid: false,
                        isExpired: true,
                        otpRecord: {
                            id: record.id,
                            type: record.type,
                            createdAt: record.createdAt,
                            expiresAt: record.expiresAt,
                            clientId: record.clientId
                        }
                    };
                }

                // OTP is valid and not expired
                if (clearAfterVerification) {
                    await prisma.otp.update({
                        where: { id: record.id },
                        data: { used: true }
                    });
                }

                return {
                    isValid: true,
                    isExpired: false,
                    otpRecord: {
                        id: record.id,
                        type: record.type,
                        createdAt: record.createdAt,
                        expiresAt: record.expiresAt,
                        clientId: record.clientId
                    }
                };
            }
        }

        // No matching OTP found
        return {
            isValid: false,
            isExpired: false
        };

    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw new Error("Failed to verify OTP", { cause: error });
    }
}



// Example usage (commented out for production)
/*
(async () => {
    try {
        // Generate OTP
        const result = await generateOtp("numeric", 6, new Date(Date.now() + 5 * 60 * 1000), "client-123");
        console.log("Generated:", result);
        // { otp: "123456", hashedOtp: "$2b$12$...", storageId: "clx..." }

        // Verify OTP
        const verification = await verifyAndClearOtp(result.otp, "client-123", true);
        console.log("Verification:", verification);
        // { isValid: true, isExpired: false, otpRecord: {...} }

        // Try to verify again (should fail since it's cleared)
        const secondVerification = await verifyAndClearOtp(result.otp, "client-123", true);
        console.log("Second verification:", secondVerification);
        // { isValid: false, isExpired: false }

    } catch (error) {
        console.error("Error:", error);
    }
})();
*/
