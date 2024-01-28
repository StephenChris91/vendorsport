import { Module } from '@nestjs/common';
import { TermsAndConditionResolver } from './terms-conditions.resolver';
import { TermsAndConditionService } from './terms-conditions.service';

@Module({
  providers: [TermsAndConditionResolver, TermsAndConditionService],
})
export class TermsAndConditionModule {}
