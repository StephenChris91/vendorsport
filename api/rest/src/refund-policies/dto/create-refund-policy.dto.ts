import { PickType } from '@nestjs/swagger';
import { RefundPolicy } from '../entities/refund-policies.entity';

export class CreateRefundPolicyDto extends PickType(RefundPolicy, [
  'title',
  'status',
  'target',
]) {}
