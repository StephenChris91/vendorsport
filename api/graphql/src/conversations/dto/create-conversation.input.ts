import { InputType, OmitType, PickType } from '@nestjs/graphql';
import { Shop } from 'src/shops/entities/shop.entity';
import { Conversation } from '../entities/conversations.entity';

@InputType()
export class CreateConversationInput extends PickType(Conversation, [
  'shop_id',
]) {}
