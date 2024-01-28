import { Module } from '@nestjs/common';
import {
  ApproveTermsAndConditionController,
  DisapproveTermsAndConditionController,
  TermsAndConditionsController,
} from './terms-and-conditions.controller';
import { TermsAndConditionsService } from './terms-and-conditions.service';

@Module({
  controllers: [
    TermsAndConditionsController,
    DisapproveTermsAndConditionController,
    ApproveTermsAndConditionController,
  ],
  providers: [TermsAndConditionsService],
})
export class TermsAndConditionsModule {}
