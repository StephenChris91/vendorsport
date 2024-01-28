import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { CreateAiDto } from './dto/create-ai.dto';

@Controller()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-descriptions')
  create(@Body() createAiDto: CreateAiDto) {
    return this.aiService.create(createAiDto);
  }
}
