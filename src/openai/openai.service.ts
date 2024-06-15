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

  async chat(
    message: string,
    conversationHistory: Array<{ role: string; content: string }>,
  ): Promise<string> {
    conversationHistory.push({ role: 'user', content: message });

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 150,
      temperature: 0.8,
      messages: conversationHistory,
    });

    if (response.choices[0] && response.choices[0].message) {
      conversationHistory.push({
        role: 'ai',
        content: response.choices[0].message.content,
      });
    }

    return response.choices[0].message.content;
  }
}
