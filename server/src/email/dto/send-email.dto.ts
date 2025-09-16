import { EmailOptions } from '../interfaces/email-options.interface';

export class SendEmailDto implements EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  context?: Record<string, any>;
}