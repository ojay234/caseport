import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          port: config.get('EMAIL_PORT'),
          secure: config.get('EMAIL_SECURE'),
          auth: {
            user: config.get('EMAIL_USER'),
            pass: config.get('EMAIL_PASSWORD'),
          },
      
        },
    
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}