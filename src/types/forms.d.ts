// Form Builder Types
export interface FormFieldConfig {
  // Common field properties
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  
  // Select/Radio/Checkbox options
  options?: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
  
  // Number field properties
  min?: number;
  max?: number;
  step?: number;
  
  // File upload properties
  allowedTypes?: string[];
  maxFileSize?: number;
  multiple?: boolean;
  
  // Date field properties
  minDate?: string;
  maxDate?: string;
  
  // Styling and layout
  className?: string;
  width?: 'full' | 'half' | 'third' | 'quarter';
  
  // Conditional logic
  showIf?: {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'not_contains';
    value: string | string[];
  };
}

export interface FormSettings {
  // Appearance
  theme?: 'light' | 'dark' | 'custom';
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  
  // Behavior
  allowDrafts?: boolean;
  showProgressBar?: boolean;
  enableFileUploads?: boolean;
  maxSubmissions?: number;
  
  // Notifications
  sendConfirmationEmail?: boolean;
  confirmationEmailTemplate?: string;
  notificationEmails?: string[];
  
  // Security
  enableCaptcha?: boolean;
  requireEmailVerification?: boolean;
  allowAnonymous?: boolean;
  
  // Redirects
  successRedirectUrl?: string;
  errorRedirectUrl?: string;
}

export type FormFieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'file'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'hidden'
  | 'divider'
  | 'heading'
  | 'paragraph';

export interface CreateFormData {
  title: string;
  description?: string;
  slug: string;
  settings?: FormSettings;
}

export interface CreateFormFieldData {
  type: FormFieldType;
  label: string;
  name: string;
  placeholder?: string;
  helpText?: string;
  isRequired?: boolean;
  order?: number;
  config?: FormFieldConfig;
}

// Contact List Types
export interface ContactPreferences {
  emailMarketing?: boolean;
  smsMarketing?: boolean;
  productUpdates?: boolean;
  newsletter?: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  timezone?: string;
  language?: string;
}

export interface CreateContactData {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  source?: string;
  tags?: string[];
  preferences?: ContactPreferences;
}

export interface CreateContactListData {
  name: string;
  description?: string;
}

export type ContactStatus = 'subscribed' | 'unsubscribed' | 'bounced' | 'complained' | 'pending';

export interface AddContactToListData {
  contactId: string;
  listId: string;
  status?: ContactStatus;
}

// Campaign Types
export interface CampaignMetrics {
  sent?: number;
  delivered?: number;
  opened?: number;
  clicked?: number;
  bounced?: number;
  unsubscribed?: number;
  complained?: number;
  openRate?: number;
  clickRate?: number;
  bounceRate?: number;
  unsubscribeRate?: number;
}

export type CampaignType = 'email' | 'sms' | 'push' | 'webhook';
export type CampaignStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'cancelled' | 'failed';

export interface CreateCampaignData {
  name: string;
  subject?: string;
  content?: string;
  type?: CampaignType;
  scheduledAt?: Date;
  listIds: string[];
}

// Form Submission Types
export interface FormSubmissionData {
  [fieldName: string]: any; // Dynamic form data
}

export interface SubmissionMetadata {
  ipAddress?: string;
  userAgent?: string;
  source?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  referrer?: string;
}

export type SubmissionStatus = 'completed' | 'draft' | 'spam' | 'flagged' | 'processing';

export interface CreateFormSubmissionData {
  formId: string;
  data: FormSubmissionData;
  contactId?: string;
  metadata?: SubmissionMetadata;
  status?: SubmissionStatus;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Prisma model types (these will be auto-generated, but useful for reference)
export interface Form {
  id: string;
  title: string;
  description?: string;
  slug: string;
  isActive: boolean;
  isPublished: boolean;
  settings?: FormSettings;
  createdAt: Date;
  updatedAt: Date;
  fields?: FormField[];
  submissions?: FormSubmission[];
}

export interface FormField {
  id: string;
  formId: string;
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  helpText?: string;
  isRequired: boolean;
  order: number;
  config?: FormFieldConfig;
  createdAt: Date;
  updatedAt: Date;
  form?: Form;
}

export interface Contact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  isActive: boolean;
  isVerified: boolean;
  preferences?: ContactPreferences;
  source?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  listMemberships?: ContactListMember[];
  formSubmissions?: FormSubmission[];
}

export interface ContactList {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  contacts?: ContactListMember[];
  campaigns?: Campaign[];
}

export interface ContactListMember {
  id: string;
  contactId: string;
  listId: string;
  status: string;
  joinedAt: Date;
  contact?: Contact;
  list?: ContactList;
}

export interface Campaign {
  id: string;
  name: string;
  subject?: string;
  content?: string;
  type: string;
  status: string;
  scheduledAt?: Date;
  sentAt?: Date;
  metrics?: CampaignMetrics;
  createdAt: Date;
  updatedAt: Date;
  lists?: ContactList[];
}

export interface FormSubmission {
  id: string;
  formId: string;
  contactId?: string;
  data: FormSubmissionData;
  ipAddress?: string;
  userAgent?: string;
  source?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  form?: Form;
  contact?: Contact;
}
