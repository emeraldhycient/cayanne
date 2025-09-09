import { verifyAndClearOtp } from "@/actions/otp/otp-generator";
import { 
    OTP_CONFIG,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
} from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body: VerifyOtpRequest = await request.json();
        
        const {
            otp,
            clientId,
            clearAfterVerification = true
        } = body;

        // Validate input
        if (!otp || typeof otp !== 'string' || otp.trim().length === 0) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: ERROR_MESSAGES.OTP_REQUIRED
                },
                { status: 400 }
            );
        }

        // Sanitize OTP (remove whitespace)
        const sanitizedOtp = otp.trim();

        if (sanitizedOtp.length < OTP_CONFIG.MIN_LENGTH || sanitizedOtp.length > OTP_CONFIG.MAX_LENGTH) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: ERROR_MESSAGES.INVALID_OTP_FORMAT
                },
                { status: 400 }
            );
        }

        // Verify OTP
        const verification = await verifyAndClearOtp(
            sanitizedOtp, 
            clientId, 
            clearAfterVerification
        );

        if (verification.isValid) {
            return NextResponse.json({
                success: true,
                data: {
                    isValid: true,
                    isExpired: false,
                    verified: true,
                    wasCleared: clearAfterVerification
                },
                message: SUCCESS_MESSAGES.OTP_VERIFIED
            });
        } else if (verification.isExpired) {
            return NextResponse.json(
                {
                    success: false,
                    data: {
                        isValid: false,
                        isExpired: true,
                        verified: false,
                        wasCleared: clearAfterVerification
                    },
                    error: ERROR_MESSAGES.OTP_EXPIRED
                },
                { status: 400 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    data: {
                        isValid: false,
                        isExpired: false,
                        verified: false,
                        wasCleared: false
                    },
                    error: ERROR_MESSAGES.INVALID_OTP
                },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error("Error verifying OTP:", error);
        
        return NextResponse.json(
            {
                success: false,
                error: ERROR_MESSAGES.VERIFY_OTP_FAILED
            },
            { status: 500 }
        );
    }
}

// Handle unsupported methods
export async function GET() {
    return NextResponse.json(
        { 
            success: false, 
            error: ERROR_MESSAGES.METHOD_NOT_ALLOWED_VERIFY
        },
        { status: 405 }
    );
}

export async function PUT() {
    return NextResponse.json(
        { 
            success: false, 
            error: ERROR_MESSAGES.METHOD_NOT_ALLOWED_VERIFY
        },
        { status: 405 }
    );
}

export async function DELETE() {
    return NextResponse.json(
        { 
            success: false, 
            error: ERROR_MESSAGES.METHOD_NOT_ALLOWED_VERIFY
        },
        { status: 405 }
    );
}
