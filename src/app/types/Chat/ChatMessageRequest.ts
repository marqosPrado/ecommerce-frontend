import { ConversationMessage } from './ConversationMessage';

export type ChatMessageRequest = {
  message: string;
  conversationId?: string;
  conversationHistory?: ConversationMessage[];
};
