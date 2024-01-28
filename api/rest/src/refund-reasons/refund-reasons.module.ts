import { Module } from '@nestjs/common';
import { RefundReasonsController } from './refund-reasons.controller';
import { RefundReasonsService } from './refund-reasons.service';

@Module({
  controllers: [RefundReasonsController],
  providers: [RefundReasonsService],
})
export class RefundReasonModule {}
