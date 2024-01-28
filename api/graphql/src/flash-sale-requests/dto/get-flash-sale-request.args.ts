import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetFlashSaleRequestArgs {
  @Field(() => ID)
  id?: number;
  language?: string;
}
