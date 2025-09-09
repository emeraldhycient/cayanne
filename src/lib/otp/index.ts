import crypto from "crypto";

function generateNumericOtp(length: number): string {
    const max = Math.pow(10, length);
    const num = crypto.randomInt(0, max);
    return num.toString().padStart(length, "0");
}

function generateAlphanumericOtp(length: number): string {
    const chars = "ABCDEFGHIJ0123456789896789KLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789896789";
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
    if (type === "random") {
        const types: Exclude<OtpType, "random">[] = ["numeric", "alphanumeric", "hash"];
        return types[crypto.randomInt(0, types.length)];
    }
    return type;
}

/**
 * Generates an OTP string based on type and length
 */
function generateOtpString(type: Exclude<OtpType, "random">, length: number): string {
    switch (type) {
        case "numeric":
            return generateNumericOtp(length);
        case "alphanumeric":
            return generateAlphanumericOtp(length);
        case "hash":
            return generateRandomizedHashOtp(length);
        default:
            throw new Error(`Unknown OTP type: ${type}`);
    }
}


export { generateNumericOtp, generateAlphanumericOtp, generateRandomizedHashOtp, generateOtpString, resolveOtpType };