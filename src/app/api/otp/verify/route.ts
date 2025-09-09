import { verifyAndClearOtp } from "@/actions/otp/otp-generator";
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
                    error: "OTP is required and must be a non-empty string." 
                },
                { status: 400 }
            );
        }

        // Sanitize OTP (remove whitespace)
        const sanitizedOtp = otp.trim();

        if (sanitizedOtp.length < 4 || sanitizedOtp.length > 10) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: "Invalid OTP format." 
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
                message: "OTP verified successfully"
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
                    error: "OTP has expired"
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
                    error: "Invalid OTP"
                },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error("Error verifying OTP:", error);
        
        return NextResponse.json(
            {
                success: false,
                error: "Failed to verify OTP. Please try again."
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
            error: "Method not allowed. Use POST to verify OTP." 
        },
        { status: 405 }
    );
}

export async function PUT() {
    return NextResponse.json(
        { 
            success: false, 
            error: "Method not allowed. Use POST to verify OTP." 
        },
        { status: 405 }
    );
}

export async function DELETE() {
    return NextResponse.json(
        { 
            success: false, 
            error: "Method not allowed. Use POST to verify OTP." 
        },
        { status: 405 }
    );
}
