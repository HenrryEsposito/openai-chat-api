import { Module } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { AirportsModule } from '../airport/airport.module';

@Module({
  providers: [OpenAiService],
  exports: [OpenAiService],
  imports: [AirportsModule],
})
export class OpenaiModule {}
