import { InputType, PickType } from '@nestjs/graphql';
import { Faqs } from '../entities/faqs.entity';

@InputType()
export class CreateFaqInput extends PickType(Faqs, [
  'faq_title',
  'faq_description',
  'slug',
  'user_id',
  'shop_id',
  'faq_type',
  'issued_by',
  'language',
]) {}
