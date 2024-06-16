import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { getJson } from 'serpapi';
import { SerpApiParams } from './interfaces';

@Injectable()
export class SerpApiService {
  constructor() {}

  private apiKey = process.env.SERPAPI_KEY;

  async getFlights(queryParams: SerpApiParams): Promise<any> {
    try {
      const results = await getJson({
        ...queryParams,
        engine: 'google_flights',
        api_key: this.apiKey,
        type: 2,
      });
      return results;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
