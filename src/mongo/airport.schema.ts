import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AirportDocument = HydratedDocument<Airport>;

@Schema()
export class Airport {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  City: string;

  @Prop({ type: String, required: true })
  Country: string;

  @Prop({ type: String, required: true })
  Code: string;

  @Prop({ type: String, required: true })
  Continent: string;
}

export const AirportSchema = SchemaFactory.createForClass(Airport);
