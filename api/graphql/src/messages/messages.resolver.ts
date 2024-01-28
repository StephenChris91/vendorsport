import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CreateMessageInput } from './dto/create-message.input';
import { GetMessagesArgs, SeenMessageInput } from './dto/get-messages.args';
import { Message, MessagePaginator } from './entities/messages.entity';
import { MessagesService } from './messages.service';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message)
  createMessage(@Args('input') createMessageInput: CreateMessageInput) {
    return this.messagesService.create(createMessageInput);
  }

  @Query(() => MessagePaginator, { name: 'messages' })
  findAll(@Args() getMessagesArgs: GetMessagesArgs) {
    return this.messagesService.findAll(getMessagesArgs);
  }

  @Mutation(() => Boolean)
  seenMessage(@Args('input') seenMessageInput: SeenMessageInput) {
    return this.messagesService.seenMessage(seenMessageInput);
  }
}
