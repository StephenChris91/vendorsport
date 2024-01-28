import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetConversationArgs {
  @Field(() => ID)
  id?: number;
}
