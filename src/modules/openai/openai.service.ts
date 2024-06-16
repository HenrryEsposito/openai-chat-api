import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import {
  findTravelTicketsDefinition,
  gatherInfoBeforeFindTravelTicketsDataForExecutionDefinition,
} from 'src/model/tools';
import { AirportsService } from '../airport/airports.service';

@Injectable()
export class OpenAiService {
  private openai;

  constructor(private readonly airportsService: AirportsService) {
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

    const tools = [
      gatherInfoBeforeFindTravelTicketsDataForExecutionDefinition,
      findTravelTicketsDefinition,
    ];

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
        if (
          toolCall.function.name ===
          'gether_info_before_find_travel_tickets_data_for_execution'
        ) {
          const args = JSON.parse(toolCall.function.arguments);

          if (!args.departureCityName && !args.departureAirportName) {
            return 'Por favor me diga o nome da cidade ou do aeroporto de partida.';
          }

          if (!args.arrivalCityName && !args.arrivalAirportName) {
            return 'Por favor me diga o nome da cidade ou do aeroporto de destino.';
          }

          const possibleDepartureAirportsData =
            await this.airportsService.findByKeyword(
              `${args.departureCityName || ''} ${args.departureAirportName || ''}`,
            );

          const possibleArrivalAirportsData =
            await this.airportsService.findByKeyword(
              `${args.arrivalCityName || ''} ${args.arrivalAirportName || ''}`,
            );

          conversationHistory.push({
            tool_call_id: toolCall.id,
            role: 'tool',
            name: toolCall.function.name,
            content: `
              The information gathered to start searching for airline tickets is listed below, you must confirm it with the user so that once he confirms, we can execute the find_travel_tickets function with the correct airport codes.
              Departure city or airport possible data: ${possibleDepartureAirportsData}
              Arrival city or airport possible data: ${possibleArrivalAirportsData}

              How to confirm the information with the user: Try to use the following pattern to confirm the information with the user:
              
              "
                Before we continue searching for flights from <departure argument> to <arrival argument>, I need to confirm some information. The departure city is <possible departure city name> - <possible departure airport code> and the arrival city <possible arrival city name> - <possible arrival airport code>, correct? Please confirm so I can look up ticket prices for you.
              "

              *Remember to speak in the user's language to confirm with the user.*

              *If the next message from the user has a confirmation meaning like (yes, exactly, right, that's right, confirmed), proceed to execute the function find_travel_tickets.*

              *If the next message from the user has a correction meaning, apologize and request more information about the trip the user wants to take.*
            `,
          });

          response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            max_tokens: 150,
            temperature: 0.8,
            messages: conversationHistory,
          });
        } else if (toolCall.function.name === 'find_travel_tickets') {
          console.log(
            'find_travel_tickets',
            JSON.parse(toolCall.function.arguments),
          );
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
