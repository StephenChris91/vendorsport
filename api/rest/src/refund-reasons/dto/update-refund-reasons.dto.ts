import { PartialType } from '@nestjs/swagger';
import { CreateRefundReasonDto } from './create-refund-reasons.dto';

export class UpdateRefundReasonDto extends PartialType(CreateRefundReasonDto) {}
