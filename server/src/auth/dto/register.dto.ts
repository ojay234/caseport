import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
    @ApiProperty({
    type: 'string',
    required: true
  })
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
   @ApiProperty({
    type: 'string',
    required: true
  })
  email: string;

  @IsPhoneNumber('NG')
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true
  })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
    @ApiProperty({
    type: 'string',
    required: true
  })
  password: string;
}

export class VerifyOtpRegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true
  })
  otp: string;
}

export class CompleteProfileDto {
  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Profile image file',
    required: false
  })
  profileImage?: any;
  @IsOptional()

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Digital signature file',
    required: false
  })
  digitalSignature?: any;


  @IsOptional()
  @IsUUID()
    @ApiProperty({
    type: 'string',
    description: 'ID of the division',
    required: false
  })
  divisionId?: string;
  fullName?: string;
  phoneNumber?: string;
}

export class CompleteProfileControllerDto {
    divisionId?: string;
    fullName?: string;
    phoneNumber?: string;
}




export class ProcessedFileUploadDto {
  data: string; 
  contentType: string; 
}

export class CompleteProfileServiceDto {
  profileImage?: ProcessedFileUploadDto;
  digitalSignature?: ProcessedFileUploadDto;
  divisionId?: string;
  fullName?: string;
  phoneNumber?: string;

}