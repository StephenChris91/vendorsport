import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import {
  ConversationPaginator,
  GetConversationsDto,
} from './dto/get-conversations.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  createConversation(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationsService.create(createConversationDto);
  }

  @Get()
  async getConversations(
    @Query() query: GetConversationsDto,
  ): Promise<ConversationPaginator> {
    return this.conversationsService.getAllConversations(query);
  }

  @Get(':param')
  getStoreNotice(@Param('param') param: string) {
    return this.conversationsService.getConversation(param);
  }
}
