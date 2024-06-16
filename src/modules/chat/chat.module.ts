import { Module } from '@nestjs/common';
import { OpenAiService } from '../openai/openai.service';
import { ConversationService } from '../conversation/conversation.service';
import { ToolsService } from '../tools/tools.service';
import { AirportsModule } from '../airport/airport.module';

@Module({
  imports: [AirportsModule],
  providers: [OpenAiService, ConversationService, ToolsService, AirportsModule],
  exports: [ConversationService],
})
export class ChatModule {}
