import { Module } from '@nestjs/common';
import { FaqsController } from './faqs.controller';
import { FaqsService } from './faqs.service';

@Module({
  controllers: [FaqsController],
  providers: [FaqsService],
})
export class FaqsModule {}
