import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class GetLowStockProductsArgs {
  @Field(() => Int, { nullable: true })
  limit?: number;
  language?: string;
  searchJoin?: string;
  search?: string;
  @Field(() => ID, { nullable: true })
  shop_id?: number;
  @Field(() => ID, { nullable: true })
  type_id?: number;
}
