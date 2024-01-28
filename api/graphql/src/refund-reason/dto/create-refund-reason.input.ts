import { Field, ID, InputType, PickType } from '@nestjs/graphql';
import { RefundReason } from '../entities/refund-reason.entity';

@InputType()
export class CreateRefundReasonInput extends PickType(RefundReason, [
  'name',
  'slug',
  'language',
]) {}