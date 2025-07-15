import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Division } from './entities/division.entity';
import { Repository } from 'typeorm';


@Injectable()
export class StaticDataService {
  constructor(
    @InjectRepository(Division) private divisionRepository: Repository<Division>,

  ) {}

  getDivision() {
    return  this.divisionRepository.find()
  }

    async onModuleInit() {
    await this.seedDivisions();
  }

  private async seedDivisions() {

    const existingDivisionsCount = await this.divisionRepository.count();

    if (existingDivisionsCount === 0) {
      const divisionsToSeed = [
        { label: 'Shehu Shagari Way', location: 'Abuja' },
        { label: 'Herbert Macaulay Way', location: 'Abuja' },
        { label: 'Wuse 2', location: 'Abuja' },
        { label: 'Garki', location: 'Abuja' },
        { label: 'Maitama', location: 'Abuja' },

      ];

      for (const data of divisionsToSeed) {
        const existingDivision = await this.divisionRepository.findOne({ where: { label: data.label } });
        if (!existingDivision) {
          const division = this.divisionRepository.create(data);
          await this.divisionRepository.save(division);

        }
      }
    }
  }


 
}
