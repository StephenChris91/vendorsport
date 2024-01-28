import { Field, ID, InputType, PickType } from '@nestjs/graphql';
import { RefundPolicy, RefundPolicyStatus, RefundPolicyTarget } from '../entities/refund-policies.entity';

@InputType()
export class CreateRefundPolicyInput extends PickType(RefundPolicy, [
  'title',
  'slug',
  'description',
  'language',
]) {
  @Field(() => ID)
  shop_id?: number;
  target?: string;
  status?: string;
}