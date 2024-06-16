import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Airport, AirportDocument } from 'src/mongo/airport.schema';

@Injectable()
export class AirportsService {
  constructor(
    @InjectModel(Airport.name) private airportModel: Model<AirportDocument>,
  ) {}

  async findByCode(code: string): Promise<Airport> {
    return this.airportModel.findOne({ Code: code }).exec();
  }

  async findByKeyword(keyword: string): Promise<Airport[]> {
    const keywords = keyword.split(' ').filter((k) => k);
    const regex = new RegExp(keywords.join('|'), 'i');
    return this.airportModel
      .find({
        $or: [
          { City: { $regex: regex } },
          { Country: { $regex: regex } },
          { Code: { $regex: regex } },
          { Continent: { $regex: regex } },
        ],
      })
      .exec();
  }

  async listAll(): Promise<Airport[]> {
    return this.airportModel.find().exec();
  }
}
