import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Message } from 'src/messages/entities/messages.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';

@InputType('ConversationInputType', { isAbstract: true })
@ObjectType()
export class Conversation extends CoreEntity {
  @Field(() => ID)
  shop_id: number;
  @Field(() => ID)
  user_id: number;
  unseen: boolean;
  @Type(() => User)
  user?: User;
  @Type(() => Shop)
  shop?: Shop;
  @Type(() => Message)
  latest_message?: Message;
}

@ObjectType()
export class ConversationPaginator {
  data: Conversation[];
  paginatorInfo: PaginatorInfo;
}
