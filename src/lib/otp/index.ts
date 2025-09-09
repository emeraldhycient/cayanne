import crypto from "crypto";
import { OTP_TYPES, GENERATION_TYPES, CHAR_SETS } from "../constants/otp";

function generateNumericOtp(length: number): string {
    const max = Math.pow(10, length);
    const num = crypto.randomInt(0, max);
    return num.toString().padStart(length, "0");
}

function generateAlphanumericOtp(length: number): string {
    const chars = CHAR_SETS.ALPHANUMERIC;
    let result = "";
    for (let i = 0; i < length; i++) {
        const idx = crypto.randomInt(0, chars.length);
        result += chars[idx];
    }
    return result;
}

function generateRandomizedHashOtp(length: number): string {
    const hash = crypto.createHash("sha256").update(crypto.randomBytes(32)).digest("hex");

    // Convert hash to array and shuffle it
    const chars = hash.split("");
    for (let i = chars.length - 1; i > 0; i--) {
        const j = crypto.randomInt(0, i + 1);
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    return chars.slice(0, length).join("");
}

/**
 * Determines the actual OTP type when "random" is specified
 */
function resolveOtpType(type: OtpType): Exclude<OtpType, "random"> {
    if (type === OTP_TYPES.RANDOM) {
        return GENERATION_TYPES[crypto.randomInt(0, GENERATION_TYPES.length)];
    }
    return type;
}

/**
 * Generates an OTP string based on type and length
 */
function generateOtpString(type: Exclude<OtpType, "random">, length: number): string {
    switch (type) {
        case OTP_TYPES.NUMERIC:
            return generateNumericOtp(length);
        case OTP_TYPES.ALPHANUMERIC:
            return generateAlphanumericOtp(length);
        case OTP_TYPES.HASH:
            return generateRandomizedHashOtp(length);
        default:
            throw new Error(`Unknown OTP type: ${type}`);
    }
}


export { generateNumericOtp, generateAlphanumericOtp, generateRandomizedHashOtp, generateOtpString, resolveOtpType };