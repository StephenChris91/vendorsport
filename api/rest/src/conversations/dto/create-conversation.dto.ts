import { PickType } from '@nestjs/swagger';
import { Conversation } from '../entities/conversation.entity';

export class CreateConversationDto extends PickType(Conversation, [
  'shop_id',
]) {}
