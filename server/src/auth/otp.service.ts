
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';
import { randomInt } from 'crypto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
  ) {}

  async generateOtp(email: string): Promise<string> {
    // Cleanup any existing OTPs for this email
    await this.otpRepository.delete({ email });

    // Generate 6-digit OTP
    const code = randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); 

    await this.otpRepository.save({
      email,
      code,
      expiresAt
    });

    return code;
  }

  async validateOtp(email: string, code: string): Promise<boolean> {
    const otp = await this.otpRepository.findOne({
      where: { email, code, used: false }
    });

    if (!otp || otp.expiresAt < new Date()) {
      return false;
    }

    // Mark OTP as used
    await this.otpRepository.update(otp.id, { used: true });

    return true;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredOtps() {
    await this.otpRepository
      .createQueryBuilder()
      .delete()
      .where('expiresAt < :now', { now: new Date() })
      .execute();
  }
}