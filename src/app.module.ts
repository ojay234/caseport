import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { UsersModule } from './users/users.module';
import { StaticDataModule } from './static-data/static-data.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env', 
  }),  DatabaseModule, AuthModule, EmailModule, UsersModule, StaticDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
