type OtpType = "numeric" | "alphanumeric" | "hash" | "random";

interface OtpGenerationResult {
    otp: string;
    hashedOtp: string;
    storageId: string;
}

interface OtpVerificationResult {
    isValid: boolean;
    isExpired: boolean;
    otpRecord?: {
        id: string;
        type: string;
        createdAt: Date;
        expiresAt: Date;
        clientId: string | null;
    };
}
