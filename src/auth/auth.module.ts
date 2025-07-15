import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { EmailModule } from 'src/email/email.module';
import { Otp } from './entities/otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpService } from './otp.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule, 
    EmailModule,
    TypeOrmModule.forFeature([Otp]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1h') 
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, OtpService,  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
  exports: [JwtStrategy, OtpService],
})
export class AuthModule {}