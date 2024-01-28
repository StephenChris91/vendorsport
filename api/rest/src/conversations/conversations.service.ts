import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import ConversationsJson from '@db/conversations.json';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { GetConversationsDto } from './dto/get-conversations.dto';

// For conversations
const conversations = plainToClass(Conversation, ConversationsJson);
const options = {
  keys: ['shop.name'],
  threshold: 0.3,
};
const fuse = new Fuse(conversations, options);

@Injectable()
export class ConversationsService {
  private conversations: Conversation[] = conversations;

  create(createConversationDto: CreateConversationDto) {
    return this.conversations[0];
  }

  getAllConversations({ page, limit, search }: GetConversationsDto) {
    if (!page) page = 1;
    let data: Conversation[] = this.conversations;
    if (search) {
      const parseSearchParams = search.split(';');
      const test = data.filter((p) => p.shop.name);
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'slug') {
          searchText.push({
            [key]: value,
          });
        }
      }
      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    const url = `/conversations?limit=${limit}`;
    return {
      data,
      ...paginate(
        this.conversations.length,
        page,
        limit,
        this.conversations.length,
        url,
      ),
    };
  }

  getConversation(param: string) {
    return this.conversations.find(
      (p) => Number(p.latest_message.conversation_id) === Number(param),
    );
  }
}
