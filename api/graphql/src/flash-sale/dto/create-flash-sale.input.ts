import { InputType, PickType } from '@nestjs/graphql';
import { FlashSale } from '../entities/flash-sale.entity';

@InputType()
export class CreateFlashSaleInput extends PickType(FlashSale, [
  'title',
  'slug',
  'description',
  'start_date',
  'language',
  'end_date',
  'type',
  'rate',
  'sale_status',
  'sale_builder',
  'cover_image',
  'image',
]) {}
