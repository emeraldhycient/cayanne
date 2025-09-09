'use server';
import { generateAlphanumericOtp, generateNumericOtp, generateRandomizedHashOtp } from "@/lib";
import crypto from "crypto";

let lastGeneratedOtp: string | null = null;

export function generateOtp(
    type: OtpType = "numeric",
    length: number = 6
): string {
    if (length < 4 || length > 6) {
        throw new Error("Length must be between 4 and 6.");
    }

    let actualType: OtpType = type;

    if (type === "random") {
        const types: OtpType[] = ["numeric", "alphanumeric", "hash"];
        actualType = types[crypto.randomInt(0, types.length)];
    }

    let otp: string;

    if (actualType === "numeric") {
        otp = generateNumericOtp(length);
    } else if (actualType === "alphanumeric") {
        otp = generateAlphanumericOtp(length);
    } else {
        otp = generateRandomizedHashOtp(length);
    }

    // Ensure no consecutive repetition
    if (otp === lastGeneratedOtp) {
        return generateOtp(type, length);
    }

    lastGeneratedOtp = otp;
    return otp;
}



// Example usage
console.log(generateOtp("numeric", 4));       // e.g., "4829"
console.log(generateOtp("alphanumeric", 6)); // e.g., "a7B3xQ"
console.log(generateOtp("hash", 6));         // e.g., "c9f2a1"
console.log(generateOtp("random", 5));       // e.g., could be "13482" OR "aZ8sK" OR "d92c1"
