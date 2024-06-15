import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { OpenAiService } from '../openai/openai.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async sendMessage(
    @Body('message') message: string,
    @Body('conversationHistory')
    conversationHistory: Array<{ role: string; content: string }>,
  ) {
    const response = await this.openAiService.chat(
      message,
      conversationHistory,
    );
    return { response };
  }
}
