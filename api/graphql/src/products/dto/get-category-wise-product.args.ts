import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetCategoryWiseProductsArgs {
  @Field(() => Int, { nullable: true })
  limit?: number;
  language?: string;
  searchJoin?: string;
  search?: string;
}