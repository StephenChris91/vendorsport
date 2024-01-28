import { Module } from '@nestjs/common';
import { FaqsResolver } from './faqs.resolver';
import { FaqsService } from './faqs.service';

@Module({
  providers: [FaqsResolver, FaqsService],
})
export class FaqsModule {}
