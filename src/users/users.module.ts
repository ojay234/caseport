import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Division } from 'src/static-data/entities/division.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Division])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
