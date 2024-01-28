import { PickType } from '@nestjs/swagger';
import { Faq } from '../entities/faq.entity';

export class CreateFaqDto extends PickType(Faq, [
  'faq_title',
  'faq_description',
]) {}
