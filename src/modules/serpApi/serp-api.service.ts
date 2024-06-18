import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { getJson } from 'serpapi';
import { SerpApiParams } from './interfaces';
import { FlightDataParsingService } from '../flightDataParsing/flight-data-parsing.service';
import { isPast, addDays, format } from 'date-fns';

@Injectable()
export class SerpApiService {
  constructor(
    private readonly flightDataParsingService: FlightDataParsingService,
  ) {}

  private apiKey = process.env.SERPAPI_KEY;

  async getFlights(queryParams: SerpApiParams): Promise<any> {
    try {
      const results = await getJson({
        ...queryParams,
        engine: 'google_flights',
        api_key: this.apiKey,
        type: queryParams.return_date ? 1 : 2,
        outbound_date: isPast(queryParams.outbound_date)
          ? format(addDays(new Date(), 1), 'yyyy-MM-dd')
          : queryParams.outbound_date,
      });

      // console.log(JSON.stringify(results, null, 2));

      return this.flightDataParsingService.generateFlightHtml(results as any);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
