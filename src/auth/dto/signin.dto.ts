import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
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
  password: string;
}