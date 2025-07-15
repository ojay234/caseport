import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaticDataService } from './static-data.service';


@Controller('static-data')
export class StaticDataController {
  constructor(private readonly staticDataService: StaticDataService) {}


  @Get("/divisions")
  findDivisions() {
    return this.staticDataService.getDivision();
  }

}
