import { Field, Float, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';

@InputType('TopRatedProductType', { isAbstract: true })
@ObjectType()
export class TopRatedProduct {
  @Field(() => ID,{ nullable: true })
  id: number;
  name?: string;
  slug?: string;
  @Field(() => Float, { nullable: true })
  regular_price?: number;
  @Field(() => Float, { nullable: true })
  sale_price?: number;
  @Field(() => Float, { nullable: true })
  min_price?: number;
  @Field(() => Float, { nullable: true })
  max_price?: number;
  product_type?: string;
  description?: string
  @Field(() => Int)
  type_id: number;
  type_slug?: string
  @Field(() => Int, { nullable: true })
  total_rating?: number;
  @Field(() => Int, { nullable: true })
  rating_count?: number;
  @Field(() => Float, { nullable: true })
  actual_rating?: number;
  image?: Attachment;
}