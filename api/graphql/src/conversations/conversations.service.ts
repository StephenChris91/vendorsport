import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import conversationsJson from './conversations.json';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { Conversation } from './entities/conversations.entity';
import { GetConversationsArgs } from './dto/get-conversations.args';
import { GetConversationArgs } from './dto/get-conversation.args';
import { CreateConversationInput } from './dto/create-conversation.input';

const conversations = plainToClass(Conversation, conversationsJson);
const options = {
  keys: ['shop.name'],
  threshold: 0.3,
};
const fuse = new Fuse(conversations, options);

@Injectable()
export class ConversationsService {
  private conversations: Conversation[] = conversations;

  create(createConversationInput: CreateConversationInput) {
    return this.conversations[0];
  }

  getConversations({ search, first, page }: GetConversationsArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: Conversation[] = this.conversations;
    if (search?.replace(/%/g, '')) {
      const formatText = search?.replace(/%/g, '');
      data = fuse.search(formatText)?.map(({ item }) => item);
    }
    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  findOne(getConversationArgs: GetConversationArgs) {
    return this.conversations.find(
      (item) =>
        Number(item.latest_message.conversation_id) ===
        Number(getConversationArgs.id),
    );
  }
}
