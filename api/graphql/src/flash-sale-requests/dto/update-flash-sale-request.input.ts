import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateFlashSaleRequestInput } from './create-flash-sale-request.input';

@InputType()
export class UpdateFlashSaleRequestInput extends PartialType(
  CreateFlashSaleRequestInput,
) {
  @Field(() => ID, { nullable: true })
  id?: number;
}
