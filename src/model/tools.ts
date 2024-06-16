export const getCurrentWeatherDefinition = {
  type: 'function',
  function: {
    name: 'get_current_weather',
    description: 'Get the current weather in a given location',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'The city and state, e.g., San Francisco, CA',
        },
        unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
      },
      required: ['location'],
    },
  },
};

export function getCurrentWeather(
  location: string,
  unit: string = 'fahrenheit',
) {
  if (location.toLowerCase().includes('tokyo')) {
    return JSON.stringify({
      location: 'Tokyo',
      temperature: '10',
      unit,
    });
  } else if (location.toLowerCase().includes('san francisco')) {
    return JSON.stringify({
      location: 'San Francisco',
      temperature: '72',
      unit,
    });
  } else if (location.toLowerCase().includes('paris')) {
    return JSON.stringify({
      location: 'Paris',
      temperature: '22',
      unit,
    });
  } else {
    return JSON.stringify({ location, temperature: 'unknown' });
  }
}

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
