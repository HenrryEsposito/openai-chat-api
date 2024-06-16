export const initialSystemPrompt = `
  Today is ${new Date().toISOString()}.
  You should never ask the user for airport codes. In a situation where the users intention is to run the "find_travel_tickets" function and you do not know the airport codes, you should run the "gether_info_before_find_travel_tickets_data_for_execution" function.
`;
