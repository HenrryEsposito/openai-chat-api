export const flightSearchToolDefinition = {
  type: 'function',
  function: {
    name: 'search_flights',
    description: 'Fetch flight results from Google Flights.',
    parameters: {
      type: 'object',
      properties: {
        departure_id: {
          type: 'string',
          description: 'The airport or location kgmid of departure.',
        },
        arrival_id: {
          type: 'string',
          description: 'The airport or location kgmid of arrival.',
        },
        outbound_date: {
          type: 'string',
          description: 'The departure date in YYYY-MM-DD format.',
        },
        return_date: {
          type: 'string',
          description: 'The return date in YYYY-MM-DD format.',
          optional: true,
        },
        currency: {
          type: 'string',
          description: 'The currency of the flight prices.',
          default: 'USD',
          optional: true,
        },
        type: {
          type: 'integer',
          description: 'The type of the flight, round trip (1) or one way (2).',
          default: 1,
          optional: true,
        },
        travel_class: {
          type: 'integer',
          description: 'The class of the flight.',
          default: 1, // Assuming Economy as default
          enum: [1, 2, 3, 4],
          optional: true,
        },
      },
      required: ['departure_id', 'arrival_id', 'outbound_date'],
    },
  },
};

export const findTravelTicketsDefinition = {
  type: 'function',
  function: {
    name: 'find_travel_tickets',
    description:
      'Find travel tickets based on departure and arrival locations.',
    parameters: {
      type: 'object',
      properties: {
        departureAirportCode: {
          type: 'string',
          description: 'The departure airport code, made of 3 letters.',
        },
        arrivalAirportCode: {
          type: 'string',
          description: 'The arrival airport code, made of 3 letters.',
        },
      },
      required: ['departureAirportCode', 'arrivalAirportCode'],
    },
  },
};

export function findTravelTickets(
  departureAirportCode: string,
  arrivalAirportCode: string,
) {
  if (departureAirportCode.toLowerCase() === 'sfo') {
    return JSON.stringify({
      departureAirportCode: 'SFO',
      arrivalAirportCode: 'JFK',
      price: '$200',
    });
  } else if (departureAirportCode.toLowerCase() === 'jfk') {
    return JSON.stringify({
      departureAirportCode: 'JFK',
      arrivalAirportCode: 'SFO',
      price: '$250',
    });
  } else {
    return JSON.stringify({
      departureAirportCode,
      arrivalAirportCode,
      price: 'unknown',
    });
  }
}

export const gatherInfoBeforeFindTravelTicketsDataForExecutionDefinition = {
  type: 'function',
  function: {
    name: 'gether_info_before_find_travel_tickets_data_for_execution',
    description:
      'gathers all necessary information and confirms with the user before executing the function find_travel_tickets.',
    parameters: {
      type: 'object',
      properties: {
        departureCityName: {
          type: 'string',
          description: 'The departure city name.',
        },
        arrivalCityName: {
          type: 'string',
          description: 'The arrival city name.',
        },
        departureAirportCode: {
          type: 'string',
          description: 'The departure airport code, made of 3 letters.',
        },
        arrivalAirportCode: {
          type: 'string',
          description: 'The arrival airport code, made of 3 letters.',
        },
        departureAirportName: {
          type: 'string',
          description: 'The departure airport name.',
        },
        arrivalAirportName: {
          type: 'string',
          description: 'The arrival airport name.',
        },
      },
      required: [],
    },
  },
};
