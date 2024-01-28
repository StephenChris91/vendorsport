import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetFlashSaleArgs {
  @Field(() => ID)
  id?: number;
  slug?: string;
  language?: string;
}
