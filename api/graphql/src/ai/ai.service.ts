import { Injectable } from '@nestjs/common';
import { AiInput } from './dto/ai.input';
import { Ai } from './entities/ai.entity';

@Injectable()
export class AiService {
  create(aiInput: AiInput): Ai {
    return {
      status: 'success',
      result: 'This response is from a mock api',
    };
  }
}
