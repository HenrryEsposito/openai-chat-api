import { Injectable } from '@nestjs/common';
import { OpenAiService } from '../openai/openai.service';
import { ToolsService } from '../tools/tools.service';
import { initialSystemPrompt } from 'src/model/reinforcementPrompts';
import { ConversationItem } from './interfaces';

@Injectable()
export class ConversationService {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly toolsService: ToolsService,
  ) {}

  private async generateGPTResponse(
    conversationHistory: any,
    giveTools = false,
  ): Promise<any> {
    const tools = this.toolsService.getToolsDefinitions();
    let baseConfig: any = {
      model: 'gpt-4o',
      max_tokens: 150,
      temperature: 0.8,
      messages: conversationHistory,
    };

    if (giveTools) {
      baseConfig = {
        ...baseConfig,
        tools: tools,
        tool_choice: 'auto',
      };
    }

    const response = await this.openAiService.createChatCompletion(baseConfig);

    conversationHistory.push({
      role: 'assistant',
      ...response.choices[0].message,
    });
  }

  async chat(
    message: string,
    conversationHistory: Array<ConversationItem>,
  ): Promise<Array<ConversationItem>> {
    try {
      if (conversationHistory.length === 0) {
        conversationHistory.push({
          role: 'system',
          content: initialSystemPrompt,
        });
      }

      conversationHistory.push({ role: 'user', content: message });

      await this.generateGPTResponse(conversationHistory, true);

      const lastEntry = conversationHistory[conversationHistory.length - 1];

      if (lastEntry.tool_calls && lastEntry.tool_calls.length > 0) {
        for (const toolCall of lastEntry.tool_calls) {
          await this.toolsService.handleToolCall(toolCall, conversationHistory);
        }
      }
    } catch (error) {
      console.error('_____________', error);
    }

    return conversationHistory;
  }
}
