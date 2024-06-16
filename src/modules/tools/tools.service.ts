import { Injectable } from '@nestjs/common';
import {
  findTravelTicketsDefinition,
  gatherInfoBeforeFindTravelTicketsDataForExecutionDefinition,
} from 'src/model/tools';
import { AirportsService } from '../airport/airports.service';
import { OpenAiService } from '../openai/openai.service';
import { SerpApiService } from '../serpApi/serp-api.service';

@Injectable()
export class ToolsService {
  constructor(
    private readonly airportsService: AirportsService,
    private readonly openAiService: OpenAiService,
    private readonly serpApiService: SerpApiService,
  ) {}

  getToolsDefinitions() {
    return [
      gatherInfoBeforeFindTravelTicketsDataForExecutionDefinition,
      findTravelTicketsDefinition,
    ];
  }

  private async generateGPTResponse(conversationHistory: any) {
    const response = await this.openAiService.createChatCompletion({
      model: 'gpt-4o',
      max_tokens: 150,
      temperature: 0.8,
      messages: conversationHistory,
    });

    conversationHistory.push({
      role: 'assistant',
      ...response.choices[0].message,
    });
  }

  async handleToolCall(toolCall: any, conversationHistory: any) {
    if (
      toolCall.function.name ===
      'gether_info_before_find_travel_tickets_data_for_execution'
    ) {
      const args = JSON.parse(toolCall.function.arguments);

      if (!args.departureCityName && !args.departureAirportName) {
        conversationHistory.push({
          tool_call_id: toolCall.id,
          role: 'tool',
          name: toolCall.function.name,
          content:
            'We still dont have enough data to search for departure airport information. Apologize to the user and ask for more information such as the name of the airport or city the user intends to depart from.',
        });
      }

      if (!args.arrivalCityName && !args.arrivalAirportName) {
        conversationHistory.push({
          tool_call_id: toolCall.id,
          role: 'tool',
          name: toolCall.function.name,
          content:
            'We still dont have enough data to search for arrival airport information. Apologize to the user and ask for more information such as the name of the airport or city where the user intends to arrive.',
        });
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

      await this.generateGPTResponse(conversationHistory);
    } else if (toolCall.function.name === 'find_travel_tickets') {
      console.log(
        'find_travel_tickets',
        JSON.parse(toolCall.function.arguments),
      );
      const flightsData = await this.serpApiService.getFlights(
        JSON.parse(toolCall.function.arguments),
      );

      conversationHistory.push({
        tool_call_id: toolCall.id,
        role: 'tool',
        name: toolCall.function.name,
        content: `
        Below are all the flight data interesting to the user, you must display it in an organized way for the user, as well as the links so that he can navigate to the source of the flight information
         ${flightsData}
         `,
      });

      await this.generateGPTResponse(conversationHistory);
    }
  }
}
