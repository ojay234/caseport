import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from './dto/send-email.dto';
import { signinConfirmationTemplate } from './templates/signin-confirmation.template';
import { passwordResetOtpTemplate } from './templates/password-reset-otp.template';
import { registerTemplate } from './templates/register';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(options: SendEmailDto): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });
      return true;
    } catch (error) {
      this.logger.error(`Error sending email to ${options.to}`, error);
      return false;
    }
  }

  async sendSigninConfirmation(email: string, username: string): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Sign-In Confirmation',
      html: signinConfirmationTemplate(username),
    });
  }

  async sendPasswordResetOtp(email: string, otp: string, username?: string): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Password Reset OTP',
      html: passwordResetOtpTemplate(username || email, otp),
    });
  }

  async sendRegistrationOtp(email: string, otp: string, username: string): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Registration OTP Verification',
      html: registerTemplate(username, otp),
    });
  }
}