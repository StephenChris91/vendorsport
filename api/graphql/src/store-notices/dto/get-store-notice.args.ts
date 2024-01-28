import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetStoreNoticeArgs {
  @Field(() => ID)
  id?: number;
  notice?: string;
  language?: string;
}
