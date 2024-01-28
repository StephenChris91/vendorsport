import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Conversation } from 'src/conversations/entities/conversations.entity';
import { User } from 'src/users/entities/user.entity';
import { Type } from 'class-transformer';

@InputType('MessageInputType', { isAbstract: true })
@ObjectType()
export class Message extends CoreEntity {
  @Field(() => ID)
  user_id: number;
  @Field(() => ID)
  conversation_id: number;
  @Type(() => Conversation)
  conversation?: Conversation;
  body?: string;
  @Type(() => User)
  user?: User;
}

@ObjectType()
export class MessagePaginator {
  data: Message[];
  paginatorInfo: PaginatorInfo;
}
