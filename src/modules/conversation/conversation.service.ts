import { Injectable } from '@nestjs/common';
import { OpenAiService } from '../openai/openai.service';
import { ToolsService } from '../tools/tools.service';
import { initialSystemPrompt } from 'src/model/reinforcementPrompts';

@Injectable()
export class ConversationService {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly toolsService: ToolsService,
  ) {}

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
    if (conversationHistory.length === 0) {
      conversationHistory.push({
        role: 'system',
        content: initialSystemPrompt,
      });
    }

    conversationHistory.push({ role: 'user', content: message });

    let response = await this.generateGPTResponse(conversationHistory, true);

    const toolCalls = response.choices[0].message.tool_calls;

    if (toolCalls && toolCalls.length > 0) {
      conversationHistory.push({
        role: 'assistant',
        name: response.choices[0].message.tool_name,
        content: response.choices[0].message.content,
        tool_calls: response.choices[0].message.tool_calls,
      });

      for (const toolCall of toolCalls) {
        response = await this.toolsService.handleToolCall(
          toolCall,
          conversationHistory,
        );
      }
    } else {
      conversationHistory.push({
        role: 'assistant',
        content: response.choices[0].message.content,
      });
    }

    return response.choices[0].message.content;
  }

  private generateGPTResponse(
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

    return this.openAiService.createChatCompletion(baseConfig);
  }
}
