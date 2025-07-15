import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ResetPasswordDto {
    @ApiProperty({
        type: 'string',
        required: true
      })
    @IsString()
    token: string;

    @ApiProperty({
        type: 'string',
        required: true
      })

    @IsString()
    newPassword: string;
  }
  export class RequestResetPasswordDto {
    @ApiProperty({
        type: 'string',
        required: true
      })
    @IsString()
    email: string
  }


  export class VerifyResetPasswordOtpDto {
    @ApiProperty({
        type: 'string',
        required: true
      })
    @IsString()
    email: string;

    @ApiProperty({
        type: 'string',
        required: true
      })

    @IsString()
    otp: string;
  }