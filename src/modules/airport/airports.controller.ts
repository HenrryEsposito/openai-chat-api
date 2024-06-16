import { Controller, Get, Query } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { Airport } from 'src/mongo/airport.schema';

@Controller('airports')
export class AirportsController {
  constructor(private airportsService: AirportsService) {}

  @Get('/find')
  async findByKeyword(@Query('text') code: string): Promise<Airport[]> {
    if (!code) {
      throw new Error('Code is required');
    }

    const data = await this.airportsService.findByKeyword(code);
    return data;
  }

  @Get('/list')
  async listAll(): Promise<Airport[]> {
    const data = await this.airportsService.listAll();
    return data;
  }
}
