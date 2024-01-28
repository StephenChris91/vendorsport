import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';

@InputType('CategoryWiseProductSaleType', { isAbstract: true })
@ObjectType()
export class CategoryWiseProductSale extends CoreEntity {
  @Field(() => ID, { nullable: true })
  category_id?: number;
  category_name?: string;
  shop_name?: string
  @Field(() => Int, { nullable: true })
  total_sales: number;
}