import { Module } from '@nestjs/common';
import { OpenAiService } from '../openai/openai.service';
import { ConversationService } from '../conversation/conversation.service';
import { ToolsService } from '../tools/tools.service';
import { AirportsModule } from '../airport/airport.module';
import { SerpApiService } from '../serpApi/serp-api.service';
import { FlightDataParsingService } from '../flightDataParsing/flight-data-parsing.service';

@Module({
  imports: [AirportsModule],
  providers: [
    OpenAiService,
    ConversationService,
    ToolsService,
    AirportsModule,
    SerpApiService,
    FlightDataParsingService,
  ],
  exports: [ConversationService],
})
export class ChatModule {}
