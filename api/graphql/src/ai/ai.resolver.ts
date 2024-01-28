import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AiService } from './ai.service';
import { AiInput } from './dto/ai.input';
import { Ai } from './entities/ai.entity';

@Resolver(() => Ai)
export class AiResolver {
  constructor(private readonly aiService: AiService) {}

  @Mutation(() => Ai)
  generateDescriptions(@Args('input') aiInput: AiInput) {
    return this.aiService.create(aiInput);
  }
}
