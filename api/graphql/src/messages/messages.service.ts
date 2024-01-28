import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import messagesJson from './messages.json';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { Message } from './entities/messages.entity';
import { GetMessagesArgs, SeenMessageInput } from './dto/get-messages.args';
import { CreateMessageInput } from './dto/create-message.input';

const messages = plainToClass(Message, messagesJson);
const options = {
  keys: ['notice'],
  threshold: 0.3,
};
const fuse = new Fuse(messages, options);

@Injectable()
export class MessagesService {
  private messages: Message[] = messages;

  create(createMessageInput: CreateMessageInput) {
    return this.messages[0];
  }

  findAll({ first, page }: GetMessagesArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    const data: Message[] = this.messages;
    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  seenMessage(seenMessageInput: SeenMessageInput) {
    return `test ${seenMessageInput}`;
  }
}
