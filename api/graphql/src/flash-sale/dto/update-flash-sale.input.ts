import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateFlashSaleInput } from './create-flash-sale.input';

@InputType()
export class UpdateFlashSaleInput extends PartialType(CreateFlashSaleInput) {
  @Field(() => ID)
  id: number;
  language?: string;
}
