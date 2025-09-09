// OTP Configuration Constants
export const OTP_CONFIG = {
  // Length constraints
  MIN_LENGTH: 4,
  MAX_LENGTH: 10,
  DEFAULT_LENGTH: 6,

  // Expiration constraints (in minutes)
  MIN_EXPIRATION_MINUTES: 1,
  MAX_EXPIRATION_MINUTES: 60,
  DEFAULT_EXPIRATION_MINUTES: 5,

  // Bcrypt configuration
  SALT_ROUNDS: 12,

  // Database query limits
  RECENT_OTPS_LIMIT: 100,
  VERIFICATION_OTPS_LIMIT: 10,
  DUPLICATE_CHECK_HOURS: 24,
} as const;

// Supported OTP types
export const OTP_TYPES = {
  NUMERIC: 'numeric',
  ALPHANUMERIC: 'alphanumeric',
  HASH: 'hash',
  RANDOM: 'random',
} as const;

// Supported channels
export const OTP_CHANNELS = {
  EMAIL: 'email',
  SMS: 'sms',
  WHATSAPP: 'whatsapp',
} as const;

// Arrays for validation
export const VALID_OTP_TYPES = Object.values(OTP_TYPES);
export const VALID_CHANNELS = Object.values(OTP_CHANNELS);
export const GENERATION_TYPES = [OTP_TYPES.NUMERIC, OTP_TYPES.ALPHANUMERIC, OTP_TYPES.HASH] as const;

// Regular expressions for validation
export const VALIDATION_REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  // Required fields
  RECIPIENT_REQUIRED: 'Recipient is required (email address, phone number, or WhatsApp number).',
  CLIENT_ID_REQUIRED: 'Client ID is required.',

  // Validation errors
  INVALID_LENGTH: `Invalid length. Must be between ${OTP_CONFIG.MIN_LENGTH} and ${OTP_CONFIG.MAX_LENGTH}.`,
  INVALID_EXPIRATION: `Invalid expiration. Must be between ${OTP_CONFIG.MIN_EXPIRATION_MINUTES} and ${OTP_CONFIG.MAX_EXPIRATION_MINUTES} minutes.`,
  INVALID_OTP_TYPE: `Invalid OTP type. Must be ${VALID_OTP_TYPES.join(', ')}.`,
  INVALID_CHANNEL: `Invalid channel. Must be ${VALID_CHANNELS.join(', ')}.`,
  INVALID_EMAIL_FORMAT: 'Invalid email format for email channel.',
  INVALID_PHONE_FORMAT: (channel: string) => `Invalid phone number format for ${channel} channel.`,
  INVALID_OTP_FORMAT: 'Invalid OTP format.',

  // Server errors
  GENERATE_OTP_FAILED: 'Failed to generate OTP. Please try again.',
  SEND_OTP_FAILED: (channel: string) => `Failed to send OTP via ${channel}. Please try again.`,
  VERIFY_OTP_FAILED: 'Failed to verify OTP. Please try again.',

  // OTP verification
  OTP_EXPIRED: 'OTP has expired',
  INVALID_OTP: 'Invalid OTP',
  OTP_REQUIRED: 'OTP is required and must be a non-empty string.',

  // Method not allowed
  METHOD_NOT_ALLOWED_GENERATE: 'Method not allowed. Use POST to generate OTP.',
  METHOD_NOT_ALLOWED_VERIFY: 'Method not allowed. Use POST to verify OTP.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  OTP_SENT: (channel: string) => `OTP sent successfully via ${channel}`,
  OTP_VERIFIED: 'OTP verified successfully',
} as const;

// Character sets for OTP generation
export const CHAR_SETS = {
  // Intentionally repetitive to increase randomness for certain characters
  ALPHANUMERIC: 'ABCDEFGHIJ0123456789896789KLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789896789',
} as const;
