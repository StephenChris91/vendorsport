import { Module } from '@nestjs/common';
import { RefundReasonResolver } from './refund-reason.resolver';
import { RefundReasonService } from './refund-reason.service';

@Module({
  providers: [RefundReasonResolver, RefundReasonService],
})
export class RefundReasonModule {}
