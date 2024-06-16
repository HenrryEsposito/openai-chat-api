import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ConversationService } from '../conversation/conversation.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async sendMessage(
    @Body('message') message: string,
    @Body('conversationHistory')
    conversationHistory: Array<{ role: string; content: string }>,
  ) {
    const response = await this.conversationService.chat(
      message,
      conversationHistory,
    );
    return { response };
  }
}
