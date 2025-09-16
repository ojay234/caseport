// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { OtpService } from './otp.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CompleteProfileControllerDto, CompleteProfileServiceDto, ProcessedFileUploadDto, RegisterDto, VerifyOtpRegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private otpService: OtpService,

  ) {}

  async signin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
  
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.emailService.sendSigninConfirmation(user.email, user.fullName|| user.email)
      .catch(error => console.error('Error sending sign-in email:', error));

    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };

    const { password: _, ...userWithoutPassword } = user;
    
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutPassword

    };
  }


  async requestPasswordReset(email: string): Promise<{ message: string }> {
    const otp = await this.otpService.generateOtp(email);
    
    await this.emailService.sendPasswordResetOtp(
      email, 
      otp
    );

    return { message: 'OTP sent to email if it exists' };
  }

  async verifyOtp(verifyResetPasswordOtpDto): Promise<{ token: string }> {
    const isValid = await this.otpService.validateOtp(verifyResetPasswordOtpDto.email, verifyResetPasswordOtpDto.otp);
    
    if (!isValid) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const email = verifyResetPasswordOtpDto.email

    return {
      token: await this.jwtService.signAsync(
        { email, purpose: 'password_reset' },
        { expiresIn: '15m' }
      )
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(resetPasswordDto.token);
      
      if (payload.purpose !== 'password_reset') {
        throw new BadRequestException('Invalid token');
      }

      const user = await this.usersService.findByEmail(payload.email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Update password
      await this.usersService.update(user.id, {
        password: resetPasswordDto.newPassword
      }, user);

      return { message: 'Password reset successfully' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }





async register(registerDto: RegisterDto): Promise<{ message: string; userId?: string }> {
  const existingUser = await this.usersService.findByEmail(registerDto.email);

  if (existingUser && existingUser.isVerified) {
    throw new BadRequestException('Email already in use');
  }


  const otp = await this.otpService.generateOtp(registerDto.email);

  // Send OTP email
  await this.emailService.sendRegistrationOtp(
    registerDto.email,
    otp,
    registerDto.fullName
  );

  let userId: string | undefined;

  if (!existingUser) {
    const newUser = await this.usersService.register({
      email: registerDto.email,
      password: registerDto.password,
      phoneNumber: registerDto.phoneNumber,
      fullName: registerDto.fullName,
      isVerified: false,
    });
    userId = newUser.id;
  } else {
    userId = existingUser.id; 
  }

  return { 
    message: 'OTP sent to your email for verification',
    userId,
  };
}

async verifyRegistration(verifyOtpDto: VerifyOtpRegisterDto){
  const isValid = await this.otpService.validateOtp(verifyOtpDto.email, verifyOtpDto.otp);
  
  if (!isValid) {
    throw new BadRequestException('Invalid or expired OTP');
  }

  const user = await this.usersService.verifyUser(verifyOtpDto.email);

  const payload = { 
    sub: user.id, 
    email: user.email, 
    role: user.role 
  };

  const { password, ...userWithoutPassword } = user;
  
  return {
    access_token: await this.jwtService.signAsync(payload),
    user: userWithoutPassword
  };
}

private processFileUpload(file?: Express.Multer.File): ProcessedFileUploadDto | undefined {
    if (file) {
      return {
        data: file.buffer.toString('base64'),
        contentType: file.mimetype,
      };
    }
    return undefined;
  }


  async completeProfile(
    userId: string,
    completeProfileControllerDto: CompleteProfileControllerDto, 
    files: { profileImage?: Express.Multer.File[], digitalSignature?: Express.Multer.File[] }
  ) {


    const completeProfileServiceDto: CompleteProfileServiceDto = {
      ...completeProfileControllerDto, 
    };

    
    if (files.profileImage && files.profileImage.length > 0) {
      completeProfileServiceDto.profileImage = this.processFileUpload(files.profileImage[0]);
    }


    if (files.digitalSignature && files.digitalSignature.length > 0) {
      completeProfileServiceDto.digitalSignature = this.processFileUpload(files.digitalSignature[0]);
    }

 
    return this.usersService.completeProfile(userId, completeProfileServiceDto);
  }

}