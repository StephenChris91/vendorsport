import { Module } from '@nestjs/common';
import { RefundPoliciesResolver } from './refund-policies.resolver';
import { RefundPoliciesService } from './refund-policies.service';

@Module({
  providers: [RefundPoliciesResolver, RefundPoliciesService],
})
export class RefundPoliciesModule {}
