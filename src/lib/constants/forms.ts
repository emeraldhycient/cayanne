// Form Builder Constants
export const FORM_FIELD_TYPES = {
  // Input fields
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  TEL: 'tel',
  URL: 'url',
  
  // Text areas
  TEXTAREA: 'textarea',
  
  // Selection fields
  SELECT: 'select',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  
  // File upload
  FILE: 'file',
  
  // Date and time
  DATE: 'date',
  TIME: 'time',
  DATETIME_LOCAL: 'datetime-local',
  
  // Special fields
  HIDDEN: 'hidden',
  DIVIDER: 'divider',
  HEADING: 'heading',
  PARAGRAPH: 'paragraph',
} as const;

export const FORM_FIELD_WIDTHS = {
  FULL: 'full',
  HALF: 'half',
  THIRD: 'third',
  QUARTER: 'quarter',
} as const;

export const FORM_THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  CUSTOM: 'custom',
} as const;

export const CONDITIONAL_OPERATORS = {
  EQUALS: 'equals',
  NOT_EQUALS: 'not_equals',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'not_contains',
} as const;

// Contact and Marketing Constants
export const CONTACT_STATUSES = {
  SUBSCRIBED: 'subscribed',
  UNSUBSCRIBED: 'unsubscribed',
  BOUNCED: 'bounced',
  COMPLAINED: 'complained',
  PENDING: 'pending',
} as const;

export const CAMPAIGN_TYPES = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  WEBHOOK: 'webhook',
} as const;

export const CAMPAIGN_STATUSES = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  SENDING: 'sending',
  SENT: 'sent',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
} as const;

export const SUBSCRIPTION_FREQUENCIES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
} as const;

// Form Submission Constants
export const SUBMISSION_STATUSES = {
  COMPLETED: 'completed',
  DRAFT: 'draft',
  SPAM: 'spam',
  FLAGGED: 'flagged',
  PROCESSING: 'processing',
} as const;

export const CONTACT_SOURCES = {
  FORM: 'form',
  IMPORT: 'import',
  API: 'api',
  MANUAL: 'manual',
  LANDING_PAGE: 'landing_page',
  SOCIAL_MEDIA: 'social_media',
  EMAIL_CAMPAIGN: 'email_campaign',
  REFERRAL: 'referral',
} as const;

// Validation Constants
export const FORM_VALIDATION = {
  TITLE_MIN_LENGTH: 1,
  TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 1000,
  SLUG_MIN_LENGTH: 1,
  SLUG_MAX_LENGTH: 100,
  FIELD_LABEL_MAX_LENGTH: 200,
  FIELD_NAME_MAX_LENGTH: 100,
  HELP_TEXT_MAX_LENGTH: 500,
  MAX_FIELDS_PER_FORM: 50,
} as const;

export const CONTACT_VALIDATION = {
  EMAIL_MAX_LENGTH: 255,
  NAME_MAX_LENGTH: 100,
  PHONE_MAX_LENGTH: 20,
  COMPANY_MAX_LENGTH: 200,
  JOB_TITLE_MAX_LENGTH: 150,
  MAX_TAGS: 20,
  TAG_MAX_LENGTH: 50,
} as const;

export const CAMPAIGN_VALIDATION = {
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 200,
  SUBJECT_MAX_LENGTH: 300,
  CONTENT_MAX_LENGTH: 100000,
} as const;

// File Upload Constants
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_SPREADSHEET_TYPES: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
} as const;

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// Error Messages for Forms
export const FORM_ERROR_MESSAGES = {
  // Form errors
  FORM_NOT_FOUND: 'Form not found',
  FORM_INACTIVE: 'Form is not active',
  FORM_NOT_PUBLISHED: 'Form is not published',
  SLUG_ALREADY_EXISTS: 'A form with this slug already exists',
  INVALID_FORM_DATA: 'Invalid form data provided',
  
  // Field errors
  FIELD_NOT_FOUND: 'Form field not found',
  INVALID_FIELD_TYPE: 'Invalid form field type',
  REQUIRED_FIELD_MISSING: 'Required field is missing',
  INVALID_FIELD_VALUE: 'Invalid field value',
  FILE_TOO_LARGE: 'File size exceeds maximum allowed size',
  INVALID_FILE_TYPE: 'File type not allowed',
  
  // Contact errors
  EMAIL_ALREADY_EXISTS: 'Contact with this email already exists',
  INVALID_EMAIL_FORMAT: 'Invalid email format',
  CONTACT_NOT_FOUND: 'Contact not found',
  ALREADY_SUBSCRIBED: 'Contact is already subscribed to this list',
  NOT_SUBSCRIBED: 'Contact is not subscribed to this list',
  
  // Campaign errors
  CAMPAIGN_NOT_FOUND: 'Campaign not found',
  CAMPAIGN_ALREADY_SENT: 'Campaign has already been sent',
  NO_CONTACTS_IN_LIST: 'No contacts found in the selected lists',
  INVALID_SCHEDULE_TIME: 'Invalid schedule time',
  
  // Submission errors
  SUBMISSION_NOT_FOUND: 'Form submission not found',
  MAX_SUBMISSIONS_REACHED: 'Maximum number of submissions reached for this form',
} as const;

// Success Messages for Forms
export const FORM_SUCCESS_MESSAGES = {
  FORM_CREATED: 'Form created successfully',
  FORM_UPDATED: 'Form updated successfully',
  FORM_DELETED: 'Form deleted successfully',
  FORM_PUBLISHED: 'Form published successfully',
  FORM_UNPUBLISHED: 'Form unpublished successfully',
  
  FIELD_CREATED: 'Form field created successfully',
  FIELD_UPDATED: 'Form field updated successfully',
  FIELD_DELETED: 'Form field deleted successfully',
  
  CONTACT_CREATED: 'Contact created successfully',
  CONTACT_UPDATED: 'Contact updated successfully',
  CONTACT_DELETED: 'Contact deleted successfully',
  CONTACT_SUBSCRIBED: 'Contact subscribed successfully',
  CONTACT_UNSUBSCRIBED: 'Contact unsubscribed successfully',
  
  LIST_CREATED: 'Contact list created successfully',
  LIST_UPDATED: 'Contact list updated successfully',
  LIST_DELETED: 'Contact list deleted successfully',
  
  CAMPAIGN_CREATED: 'Campaign created successfully',
  CAMPAIGN_UPDATED: 'Campaign updated successfully',
  CAMPAIGN_DELETED: 'Campaign deleted successfully',
  CAMPAIGN_SENT: 'Campaign sent successfully',
  CAMPAIGN_SCHEDULED: 'Campaign scheduled successfully',
  
  SUBMISSION_CREATED: 'Form submission created successfully',
  SUBMISSION_UPDATED: 'Form submission updated successfully',
} as const;

// Arrays for validation
export const VALID_FORM_FIELD_TYPES = Object.values(FORM_FIELD_TYPES);
export const VALID_CONTACT_STATUSES = Object.values(CONTACT_STATUSES);
export const VALID_CAMPAIGN_TYPES = Object.values(CAMPAIGN_TYPES);
export const VALID_CAMPAIGN_STATUSES = Object.values(CAMPAIGN_STATUSES);
export const VALID_SUBMISSION_STATUSES = Object.values(SUBMISSION_STATUSES);
export const VALID_CONTACT_SOURCES = Object.values(CONTACT_SOURCES);
export const VALID_SUBSCRIPTION_FREQUENCIES = Object.values(SUBSCRIPTION_FREQUENCIES);
