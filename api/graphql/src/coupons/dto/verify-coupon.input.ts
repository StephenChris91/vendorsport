import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Coupon } from '../entities/coupon.entity';

@InputType()
export class VerifyCouponItemInput {
  @Field(() => ID, { nullable: true })
  id?: number;
  name?: string;
  slug?: string;
  unit?: string;
  image?: string;
  @Field(() => Int, { nullable: true })
  stock?: number;
  @Field(() => Int, { nullable: true })
  price?: number;
  language?: string;
  @Field(() => Int)
  in_flash_sale?: number;
  is_digital?: boolean
  @Field(() => ID, { nullable: true })
  shop_id?: number
  @Field(() => Int, { nullable: true })
  quantity?: number;
  @Field(() => Int, { nullable: true })
  itemTotal?: number;
}
@InputType()
export class VerifyCouponInput {
  code?: string;
  sub_total?: number;
  item?: VerifyCouponItemInput[];
}
@ObjectType()
export class VerifyCouponResponse {
  is_valid: boolean;
  coupon: Coupon;
  message: string;
}
