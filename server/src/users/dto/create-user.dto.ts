import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsIn,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsIn(['lawyer', 'admin'])
  role?: string;

  @IsString()
  fullName: string;

  @IsOptional()
  phoneNumber?: string;

  @IsBoolean()
  isVerified: boolean
}
