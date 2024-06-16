export interface ConversationItem {
  role: string;
  content: string;
  tool_call_id?: string;
  name?: string;
  tool_calls?: Array<{ id: string; function: { name: string } }>;
  tool_name?: string;
}
