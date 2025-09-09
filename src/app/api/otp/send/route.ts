import { generateOtp } from "@/actions/otp/otp-generator";
import { 
    OTP_CONFIG, 
    OTP_CHANNELS, 
    VALID_OTP_TYPES, 
    VALID_CHANNELS, 
    VALIDATION_REGEX,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
} from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body: SendOtpRequest = await request.json();

        const {
            type = "numeric",
            length = OTP_CONFIG.DEFAULT_LENGTH,
            clientId,
            expirationMinutes = OTP_CONFIG.DEFAULT_EXPIRATION_MINUTES,
            channel = OTP_CHANNELS.SMS,
            recipient
        } = body;

        // Validate required fields
        if (!recipient || typeof recipient !== 'string' || recipient.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: ERROR_MESSAGES.RECIPIENT_REQUIRED
                },
                { status: 400 }
            );
        }

        // Validate length
        if (length < OTP_CONFIG.MIN_LENGTH || length > OTP_CONFIG.MAX_LENGTH) {
            return NextResponse.json(
                {
                    success: false,
                    error: ERROR_MESSAGES.INVALID_LENGTH
                },
                { status: 400 }
            );
        }

        // Validate expiration
        if (expirationMinutes < OTP_CONFIG.MIN_EXPIRATION_MINUTES || expirationMinutes > OTP_CONFIG.MAX_EXPIRATION_MINUTES) {
            return NextResponse.json(
                {
                    success: false,
                    error: ERROR_MESSAGES.INVALID_EXPIRATION
                },
                { status: 400 }
            );
        }

        // Validate OTP type
        if (!VALID_OTP_TYPES.includes(type)) {
            return NextResponse.json(
                {
                    success: false,
                    error: ERROR_MESSAGES.INVALID_OTP_TYPE
                },
                { status: 400 }
            );
        }

        // Validate channel
        if (!VALID_CHANNELS.includes(channel)) {
            return NextResponse.json(
                {
                    success: false,
                    error: ERROR_MESSAGES.INVALID_CHANNEL
                },
                { status: 400 }
            );
        }

        // Validate recipient format based on channel
        const sanitizedRecipient = recipient.trim();
        if (channel === OTP_CHANNELS.EMAIL) {
            if (!VALIDATION_REGEX.EMAIL.test(sanitizedRecipient)) {
                return NextResponse.json(
                    {
                        success: false,
                        error: ERROR_MESSAGES.INVALID_EMAIL_FORMAT
                    },
                    { status: 400 }
                );
            }
        } else if (channel === OTP_CHANNELS.SMS || channel === OTP_CHANNELS.WHATSAPP) {
            if (!VALIDATION_REGEX.PHONE.test(sanitizedRecipient.replace(/[\s\-\(\)]/g, ''))) {
                return NextResponse.json(
                    {
                        success: false,
                        error: ERROR_MESSAGES.INVALID_PHONE_FORMAT(channel)
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
                case OTP_CHANNELS.EMAIL:
                    // TODO: Implement email sending service
                    // await sendOtpViaEmail(result.otp, sanitizedRecipient);
                    console.log(`[EMAIL] Sending OTP ${result.otp} to ${sanitizedRecipient}`);
                    break;
                case OTP_CHANNELS.SMS:
                    // TODO: Implement SMS sending service
                    // await sendOtpViaSms(result.otp, sanitizedRecipient);
                    console.log(`[SMS] Sending OTP ${result.otp} to ${sanitizedRecipient}`);
                    break;
                case OTP_CHANNELS.WHATSAPP:
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
                    error: ERROR_MESSAGES.SEND_OTP_FAILED(channel)
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
            message: SUCCESS_MESSAGES.OTP_SENT(channel)
        });

    } catch (error) {
        console.error("Error generating OTP:", error);

        return NextResponse.json(
            {
                success: false,
                error: ERROR_MESSAGES.GENERATE_OTP_FAILED
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
            error: ERROR_MESSAGES.METHOD_NOT_ALLOWED_GENERATE
        },
        { status: 405 }
    );
}

export async function PUT() {
    return NextResponse.json(
        {
            success: false,
            error: ERROR_MESSAGES.METHOD_NOT_ALLOWED_GENERATE
        },
        { status: 405 }
    );
}

export async function DELETE() {
    return NextResponse.json(
        {
            success: false,
            error: ERROR_MESSAGES.METHOD_NOT_ALLOWED_GENERATE
        },
        { status: 405 }
    );
}
