import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { GetFaqsDto } from './dto/get-faqs.dto';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Controller('faqs')
export class FaqsController {
  constructor(private faqService: FaqsService) {}

  @Post()
  createFaq(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Get()
  findAll(@Query() query: GetFaqsDto) {
    return this.faqService.findAllFaqs(query);
  }

  @Get(':param')
  getFaq(@Param('param') param: string, @Query('language') language: string) {
    return this.faqService.getFaq(param, language);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Param('language') language: string,
    @Body() updateFaqDto: UpdateFaqDto,
  ) {
    return this.faqService.update(+id, updateFaqDto);
  }

  @Delete(':id')
  deleteFaq(@Param('id') id: string) {
    return this.faqService.remove(+id);
  }
}
