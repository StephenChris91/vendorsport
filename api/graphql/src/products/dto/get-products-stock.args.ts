import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class GetProductsStockArgs {
  @Field(() => Int, { nullable: true })
  limit?: string;
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
}