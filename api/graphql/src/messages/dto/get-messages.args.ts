import {
  ArgsType,
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args';

@ArgsType()
export class GetMessagesArgs extends PaginationArgs {
  orderBy?: string;
  sortedBy?: string;
  @Field(() => ID)
  conversation_id: number;
}

@InputType()
export class SeenMessageInput {
  @Field(() => ID)
  conversation_id: number;
}
