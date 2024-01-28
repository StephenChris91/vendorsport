import { Args, Resolver, Query, Mutation, ID } from '@nestjs/graphql';
import { ConversationsService } from './conversations.service';
import { CreateConversationInput } from './dto/create-conversation.input';
import { GetConversationArgs } from './dto/get-conversation.args';
import { GetConversationsArgs } from './dto/get-conversations.args';
import {
  Conversation,
  ConversationPaginator,
} from './entities/conversations.entity';

@Resolver(() => Conversation)
export class ConversationsResolver {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Mutation(() => Conversation)
  createConversation(
    @Args('input') createConversationInput: CreateConversationInput,
  ) {
    return this.conversationsService.create(createConversationInput);
  }

  @Query(() => ConversationPaginator, { name: 'conversations' })
  getConversations(@Args() getConversationsArgs: GetConversationsArgs) {
    return this.conversationsService.getConversations(getConversationsArgs);
  }

  @Query(() => Conversation, { name: 'conversation', nullable: true })
  findOne(@Args() getConversationArgs: GetConversationArgs) {
    return this.conversationsService.findOne(getConversationArgs);
  }
}
