import { InputType, PickType } from '@nestjs/graphql';
import { Coupon } from '../entities/coupon.entity';

@InputType()
export class CreateCouponInput extends PickType(Coupon, [
  'code',
  'type',
  'language',
  'amount',
  'minimum_cart_amount',
  'description',
  'image',
  'active_from',
  'expire_at',
  'target',
  'is_approve',
  'shop_id',
  'user_id',
]) {}