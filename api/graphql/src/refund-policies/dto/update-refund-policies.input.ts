import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateRefundPolicyInput } from './create-refund-policies.input';

@InputType()
export class UpdateRefundPolicyInput extends PartialType(CreateRefundPolicyInput) {
  @Field(() => ID)
  id: number;
  language?: string;
}
