import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirportsController } from './airports.controller';
import { Airport, AirportSchema } from 'src/mongo/airport.schema';
import { AirportsService } from './airports.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Airport.name, schema: AirportSchema, collection: 'airports' },
    ]),
  ],
  controllers: [AirportsController],
  providers: [AirportsService],
})
export class AirportsModule {}
