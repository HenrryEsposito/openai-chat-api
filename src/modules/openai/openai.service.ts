import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAiService {
  private openai;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  createChatCompletion(config: any): Promise<any> {
    return this.openai.chat.completions.create(config);
  }
}
