import crypto from "crypto";

function generateNumericOtp(length: number): string {
    const max = Math.pow(10, length);
    const num = crypto.randomInt(0, max);
    return num.toString().padStart(length, "0");
}

function generateAlphanumericOtp(length: number): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

export { generateNumericOtp, generateAlphanumericOtp, generateRandomizedHashOtp };