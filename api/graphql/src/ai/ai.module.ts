import { Module } from '@nestjs/common';
import { AiResolver } from './ai.resolver';
import { AiService } from './ai.service';

@Module({
  providers: [AiResolver, AiService],
})
export class AiModule {}
