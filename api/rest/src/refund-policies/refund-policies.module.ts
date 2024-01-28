import { Module } from '@nestjs/common';
import { RefundPoliciesController } from './refund-policies.controller';
import { RefundPoliciesService } from './refund-policies.service';

@Module({
  controllers: [RefundPoliciesController],
  providers: [RefundPoliciesService],
})
export class RefundPoliciesModule {}
