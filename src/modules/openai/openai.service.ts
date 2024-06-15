import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import {
  getCurrentWeather,
  getCurrentWeatherDefinition,
} from 'src/model/tools';

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
    conversationHistory: Array<{
      role: string;
      content: string;
      tool_call_id?: string;
      name?: string;
      tool_calls?: Array<{ id: string; function: { name: string } }>;
    }>,
  ): Promise<string> {
    conversationHistory.push({ role: 'user', content: message });

    const tools = [getCurrentWeatherDefinition];

    let response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 150,
      temperature: 0.8,
      messages: conversationHistory,
      tools: tools,
      tool_choice: 'auto',
    });

    const toolCalls = response.choices[0].message.tool_calls;

    if (toolCalls && toolCalls.length > 0) {
      conversationHistory.push({
        role: 'assistant',
        name: response.choices[0].message.tool_name,
        content: response.choices[0].message.content,
        tool_calls: response.choices[0].message.tool_calls,
      });

      for (const toolCall of toolCalls) {
        if (toolCall.function.name === 'get_current_weather') {
          const args = JSON.parse(toolCall.function.arguments);
          const weatherResult = getCurrentWeather(args.location, args.unit);
          console.log('toolCall', toolCall, weatherResult);

          conversationHistory.push({
            tool_call_id: toolCall.id,
            role: 'tool',
            name: toolCall.function.name,
            content: weatherResult,
          });

          response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            max_tokens: 150,
            temperature: 0.8,
            messages: conversationHistory,
          });
        }
      }
    } else {
      conversationHistory.push({
        role: 'assistant',
        content: response.choices[0].message.content,
      });
    }

    return response.choices[0].message.content;
  }
}
