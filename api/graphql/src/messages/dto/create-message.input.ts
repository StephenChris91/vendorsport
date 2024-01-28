import { InputType, PickType } from '@nestjs/graphql';
import { Message } from '../entities/messages.entity';

@InputType()
export class CreateMessageInput extends PickType(Message, ['conversation_id']) {
  message: string;
}
