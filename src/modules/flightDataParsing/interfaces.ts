export type SerpApiData = {
  search_metadata: {
    id: string;
    status: string;
    json_endpoint: string;
    created_at: string;
    processed_at: string;
    google_flights_url: string;
    raw_html_file: string;
    prettify_html_file: string;
    total_time_taken: number;
  };
  search_parameters: {
    engine: string;
    hl: string;
    gl: string;
    type: string;
    departure_id: string;
    arrival_id: string;
    outbound_date: string;
  };
  best_flights: Array<{
    flights: Array<{
      departure_airport: {
        name: string;
        id: string;
        time: string;
      };
      arrival_airport: {
        name: string;
        id: string;
        time: string;
      };
      duration: number;
      airplane: string;
      airline: string;
      airline_logo: string;
      travel_class: string;
      flight_number: string;
      legroom: string;
      extensions: Array<string>;
    }>;
    total_duration: number;
    carbon_emissions: {
      this_flight: number;
      typical_for_this_route: number;
      difference_percent: number;
    };
    price: number;
    type: string;
    airline_logo: string;
    booking_token: string;
    layovers?: Array<{
      duration: number;
      name: string;
      id: string;
    }>;
  }>;
  other_flights: Array<{
    flights: Array<{
      departure_airport: {
        name: string;
        id: string;
        time: string;
      };
      arrival_airport: {
        name: string;
        id: string;
        time: string;
      };
      duration: number;
      airplane: string;
      airline: string;
      airline_logo: string;
      travel_class: string;
      flight_number: string;
      legroom: string;
      extensions: Array<string>;
      overnight?: boolean;
    }>;
    layovers: Array<{
      duration: number;
      name: string;
      id: string;
      overnight?: boolean;
    }>;
    total_duration: number;
    carbon_emissions: {
      this_flight: number;
      typical_for_this_route: number;
      difference_percent: number;
    };
    price: number;
    type: string;
    airline_logo: string;
    booking_token: string;
  }>;
  price_insights: {
    lowest_price: number;
    price_level: string;
    typical_price_range: Array<number>;
    price_history: Array<Array<number>>;
  };
};
