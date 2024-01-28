import { Field, ID, InputType, PickType } from '@nestjs/graphql';
import { FlashSaleRequests } from '../entities/flash-sale-request.entity';

@InputType()
export class CreateFlashSaleRequestInput extends PickType(FlashSaleRequests, [
  'title',
  'flash_sale_id',
  'note',
  'language',
]) {
  @Field(() => [ID], { nullable: true })
  requested_product_ids?: number[];
}