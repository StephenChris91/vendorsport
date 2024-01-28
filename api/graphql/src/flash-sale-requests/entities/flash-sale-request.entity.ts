import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { FlashSale } from 'src/flash-sale/entities/flash-sale.entity';

@InputType('FlashSaleRequestInputType', { isAbstract: true })
@ObjectType()
export class FlashSaleRequests extends CoreEntity {
  title?: string;
  @Field(() => ID, { nullable: true })
  flash_sale_id?: number;
  request_status?: boolean;
  note?: string;
  language?: string;
  flash_sale?: FlashSale;
  deleted_at?: string;
}
