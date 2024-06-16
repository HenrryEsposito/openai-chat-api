export const findTravelTicketsDefinition = {
  type: 'function',
  function: {
    name: 'find_travel_tickets',
    description:
      'This function finds travel tickets based on departure and arrival locations. This function needs the codes for the departure and arrival airports, if you dont have them yet, use the gether_info_before_find_travel_tickets_data_for_execution function to get them',
    parameters: {
      type: 'object',
      properties: {
        departure_id: {
          type: 'string',
          description: 'The airport code of departure.',
        },
        arrival_id: {
          type: 'string',
          description: 'The airport code of arrival.',
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

export const gatherInfoBeforeFindTravelTicketsDataForExecutionDefinition = {
  type: 'function',
  function: {
    name: 'gether_info_before_find_travel_tickets_data_for_execution',
    description:
      'This function gathers all necessary information and confirms with the user before executing the function find_travel_tickets. This function helps to obtain airport codes if the user does not know.',
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
