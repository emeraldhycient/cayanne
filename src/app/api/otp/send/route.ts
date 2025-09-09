import { generateOtp } from "@/actions/otp/otp-generator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body: SendOtpRequest = await request.json();
        
        const {
            type = "numeric",
            length = 6,
            clientId,
            expirationMinutes = 5,
            channel = "sms",
        } = body;

        // Validate required fields
        if (!clientId || typeof clientId !== 'string' || clientId.trim().length === 0) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: "Recipient is required (email address, phone number, or WhatsApp number)." 
                },
                { status: 400 }
            );
        }

        // Validate expiration
        if (expirationMinutes < 1 || expirationMinutes > 60) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: "Invalid expiration. Must be between 1 and 60 minutes." 
                },
                { status: 400 }
            );
        }

        // Validate OTP type
        if (!["numeric", "alphanumeric", "hash", "random"].includes(type)) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: "Invalid OTP type. Must be numeric, alphanumeric, hash, or random." 
                },
                { status: 400 }
            );
        }

        // Validate channel
        if (!["email", "sms", "whatsapp"].includes(channel)) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: "Invalid channel. Must be email, sms, or whatsapp." 
                },
                { status: 400 }
            );
        }

        // Validate recipient format based on channel
        const sanitizedRecipient = clientId.trim();
        if (channel === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(sanitizedRecipient)) {
                return NextResponse.json(
                    { 
                        success: false, 
                        error: "Invalid email format for email channel." 
                    },
                    { status: 400 }
                );
            }
        } else if (channel === "sms" || channel === "whatsapp") {
            // Basic phone number validation (adjust regex as needed for your requirements)
            const phoneRegex = /^\+?[1-9]\d{1,14}$/;
            if (!phoneRegex.test(sanitizedRecipient.replace(/[\s\-\(\)]/g, ''))) {
                return NextResponse.json(
                    { 
                        success: false, 
                        error: `Invalid phone number format for ${channel} channel.` 
                    },
                    { status: 400 }
                );
            }
        }

        // Calculate expiration date
        const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000);

        // Generate OTP
        const result = await generateOtp(type, length, expiresAt, clientId);

        // Send OTP via specified channel
        try {
            switch (channel) {
                case "email":
                    // TODO: Implement email sending service
                    // await sendOtpViaEmail(result.otp, sanitizedRecipient);
                    console.log(`[EMAIL] Sending OTP ${result.otp} to ${sanitizedRecipient}`);
                    break;
                case "sms":
                    // TODO: Implement SMS sending service
                    // await sendOtpViaSms(result.otp, sanitizedRecipient);
                    console.log(`[SMS] Sending OTP ${result.otp} to ${sanitizedRecipient}`);
                    break;
                case "whatsapp":
                    // TODO: Implement WhatsApp sending service
                    // await sendOtpViaWhatsApp(result.otp, sanitizedRecipient);
                    console.log(`[WHATSAPP] Sending OTP ${result.otp} to ${sanitizedRecipient}`);
                    break;
            }
        } catch (sendError) {
            console.error(`Error sending OTP via ${channel}:`, sendError);
            return NextResponse.json(
                {
                    success: false,
                    error: `Failed to send OTP via ${channel}. Please try again.`
                },
                { status: 500 }
            );
        }

        // Return success response (OTP data excluded for security)
        return NextResponse.json({
            success: true,
            data: {
                storageId: result.storageId,
                expiresAt: expiresAt.toISOString(),
                type: type,
                channel: channel,
                recipient: sanitizedRecipient,
                clientId: clientId || null
            },
            message: `OTP sent successfully via ${channel}`
        });

    } catch (error) {
        console.error("Error generating OTP:", error);
        
        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate OTP. Please try again."
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
            error: "Method not allowed. Use POST to generate OTP." 
        },
        { status: 405 }
    );
}

export async function PUT() {
    return NextResponse.json(
        { 
            success: false, 
            error: "Method not allowed. Use POST to generate OTP." 
        },
        { status: 405 }
    );
}

export async function DELETE() {
    return NextResponse.json(
        { 
            success: false, 
            error: "Method not allowed. Use POST to generate OTP." 
        },
        { status: 405 }
    );
}
