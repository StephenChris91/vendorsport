import { Module } from '@nestjs/common';
import { ConversationsResolver } from './conversations.resolver';
import { ConversationsService } from './conversations.service';

@Module({
  providers: [ConversationsResolver, ConversationsService],
})
export class ConversationsModule {}
