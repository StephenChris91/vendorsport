import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetBestSellingProductsArgs {
  @Field(() => Int, { nullable: true })
  limit?: number;
  @Field(() => Int, { nullable: true })
  shop_id?: number;
  @Field(() => Int, { nullable: true })
  range?: number;
  @Field(() => Int, { nullable: true })
  type_id?: number;
  type_slug?: string;
}
