import { PickType } from '@nestjs/swagger';
import { RefundReason } from '../entities/refund-reasons.entity';

export class CreateRefundReasonDto extends PickType(RefundReason, ['name']) {}
