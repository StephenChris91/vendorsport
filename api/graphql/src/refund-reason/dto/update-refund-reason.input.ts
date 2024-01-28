import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateRefundReasonInput } from './create-refund-reason.input';

@InputType()
export class UpdateRefundReasonInput extends PartialType(CreateRefundReasonInput) {
  @Field(() => ID)
  id: number;
}
