import {
  Conversation,
  LatestMessage,
} from 'src/conversations/entities/conversation.entity';

export class Message extends LatestMessage {
  conversation: Conversation;
}
