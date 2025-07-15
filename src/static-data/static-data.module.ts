import { Module } from '@nestjs/common';
import { StaticDataService } from './static-data.service';
import { StaticDataController } from './static-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Division } from './entities/division.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Division])],
  controllers: [StaticDataController],
  providers: [StaticDataService],
    exports: [StaticDataService],
})
export class StaticDataModule {}
