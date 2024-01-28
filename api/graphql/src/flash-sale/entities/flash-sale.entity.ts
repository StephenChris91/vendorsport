import { Field, Float, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';

@InputType('FlashSaleInputType', { isAbstract: true })
@ObjectType()
export class FlashSale extends CoreEntity {
  title?: string;
  slug?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  sale_status?: boolean;
  type?: string;
  @Field(() => Float)
  rate?: number;
  language?: string;
  translated_languages?: string[];
  cover_image?: Attachment;
  image?: Attachment;
  sale_builder?: SaleBuilder;
  products?: Product[];
}


@InputType('SaleBuilderInput', { isAbstract: true })
@ObjectType()
export class SaleBuilder {
  data_type?: string;
  @Field(() => [ID],{nullable:true})
  product_ids?: number[];
}