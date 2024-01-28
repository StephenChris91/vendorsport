import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class GetProductsDraftArgs {
  @Field(() => Int, { nullable: true })
  limit?: number;
  language?: string;
  searchJoin?: string;
  search?: string;
  name?: string;
  @Field(() => ID)
  type_id?: number;
  @Field(() => ID)
  shop_id?: number;
  orderBy?: string;
  sortedBy?: string;
  page?: number;
  first?: number;
}

