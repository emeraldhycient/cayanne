type OtpType = "numeric" | "alphanumeric" | "hash" | "random";
type OtpChannel = "email" | "sms" | "whatsapp";

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

interface SendOtpRequest {
    type?: OtpType;
    length?: number;
    clientId?: string;
    expirationMinutes?: number;
    channel?: OtpChannel;
    recipient: string; // Email address, phone number, or WhatsApp number
}

interface VerifyOtpRequest {
    otp: string;
    clientId?: string;
    clearAfterVerification?: boolean;
}