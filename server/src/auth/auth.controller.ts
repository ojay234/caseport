import { Controller, Post, Body, UsePipes, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Public } from 'src/common/decorators/public.decorator';
import { RequestResetPasswordDto, ResetPasswordDto, VerifyResetPasswordOtpDto } from './dto/reset-password.dto';
import { CompleteProfileControllerDto, CompleteProfileDto, RegisterDto, VerifyOtpRegisterDto } from './dto/register.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

 @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
  description: 'Register New Users',
  type: RegisterDto,
})
  @Public()
  @UsePipes(new ValidationPipe())
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }


  @Post('signin')
   @ApiBody({
  description: 'Sign in Users',
  type: SignInDto,
})
  @Public()
  @UsePipes(new ValidationPipe())
  async signin(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('request-password-reset')
   @ApiBody({
  description: 'Reset Password',
  type: RequestResetPasswordDto,
})
  async requestPasswordReset(@Body('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }

  @Public()
  @Post('password-reset/verify-otp')
@ApiBody({
  description: 'Verify Reset Password',
  type: VerifyResetPasswordOtpDto,
})
  async verifyOtp(
    @Body() verifyResetPasswordOtpDto: VerifyResetPasswordOtpDto){
    return this.authService.verifyOtp(verifyResetPasswordOtpDto);
  }

  @Public()
  @Post('verify-registration')
  @ApiBody({
  description: 'Verify User',
  type: VerifyOtpRegisterDto,
})
  @UsePipes(new ValidationPipe())
  verifyRegistration(@Body() verifyOtpDto: VerifyOtpRegisterDto) {
    return this.authService.verifyRegistration(verifyOtpDto);
  }


  @Post('complete-profile')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'profileImage', maxCount: 1 },
    { name: 'digitalSignature', maxCount: 1 },
  ]))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Complete user profile with image, signature, and division.',
    schema: {
      type: 'object',
      properties: {
        profileImage: { type: 'string', format: 'binary', description: 'User profile image file' },
        digitalSignature: { type: 'string', format: 'binary', description: 'User digital signature file' },
        divisionId: { type: 'string', description: 'ID of the user\'s division' },
      
      },
    },
  })
  async completeProfile(
    @Req() req,
    @UploadedFiles() files: {
      profileImage?: Express.Multer.File[],
      digitalSignature?: Express.Multer.File[]
    },
    @Body() completeProfileControllerDto: CompleteProfileControllerDto, 
  ) {
    return this.authService.completeProfile(
      req.user.id,
      completeProfileControllerDto, 
      files 
    );
  }


  @Public()
  @Post('reset-password')
  @ApiBody({
  description: 'Reset Password',
  type: ResetPasswordDto,
})
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}