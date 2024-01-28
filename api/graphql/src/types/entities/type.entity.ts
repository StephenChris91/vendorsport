import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';

@InputType('TypeInputType', { isAbstract: true })
@ObjectType()
export class Type extends CoreEntity {
  name?: string;
  slug?: string;
  image?: Attachment;
  icon?: string;
  banners?: Banner[];
  promotional_sliders?: Attachment[];
  settings?: TypeSettings;
  language?: string;
  translated_languages?: string[];
}

@InputType('BannerInputType', { isAbstract: true })
@ObjectType()
export class Banner extends CoreEntity {
  title?: string;
  description?: string;
  image?: Attachment;
}
@InputType('CompactBestSellingInputType', { isAbstract: true })
@ObjectType()
export class CompactBestSellingInput extends CoreEntity {
  enable?: boolean;
  title?: string;
}
@InputType('CompactDemoPopularProductsInputType', { isAbstract: true })
@ObjectType()
export class CompactDemoPopularProductsInput extends CoreEntity {
  enable?: boolean;
  title?: string;
}
@InputType('CompactDemoCategoryInputType', { isAbstract: true })
@ObjectType()
export class CompactDemoCategoryInput extends CoreEntity {
  enable?: boolean;
  title?: string;
}
@InputType('CompactDemoHandpickedProductsInputType', { isAbstract: true })
@ObjectType()
export class CompactDemoHandpickedProductsInput extends CoreEntity {
  enable?: boolean;
  title?: string;
  enableSlider?: boolean
  products?: CompactProductInput[]
}
@InputType('CompactDemoNewArrivalInputType', { isAbstract: true })
@ObjectType()
export class CompactDemoNewArrivalInput extends CoreEntity {
  enable?: boolean;
  title?: string;
}
@InputType('CompactDemoAuthorsInputType', { isAbstract: true })
@ObjectType()
export class CompactDemoAuthorsInput extends CoreEntity {
  enable?: boolean;
  title?: string;
}
@InputType('CompactDemoManufacturesInputType', { isAbstract: true })
@ObjectType()
export class CompactDemoManufacturesInput extends CoreEntity {
  enable?: boolean;
  title?: string;
}
@InputType('CompactProductInputType', { isAbstract: true })
@ObjectType()
export class CompactProductInput extends CoreEntity {
  slug?: string
  name?: string
  image?: Attachment
  @Field(() => Float, { nullable: true })
  regular_price?: number;
  @Field(() => Float, { nullable: true })
  sale_price?: number;
  @Field(() => Float, { nullable: true })
  min_price?: number;
  @Field(() => Float, { nullable: true })
  max_price?: number;
  product_type?: string
  @Field(() => Int, { nullable: true })
  quantity?: number;
  is_external?: boolean
  unit?: string
  @Field(() => Float, { nullable: true })
  price?: number;
  external_product_url?: string
  status?: string
  type?: CompactTypeSettingsInput
}
@InputType('CompactTypeProductCardInputType', { isAbstract: true })
@ObjectType()
export class CompactTypeProductCardInput extends CoreEntity {
  productCard?: string
}
@InputType('CompactTypeSettingsInputType', { isAbstract: true })
@ObjectType()
export class CompactTypeSettingsInput extends CoreEntity {
  settings?: CompactTypeProductCardInput
}

@InputType('TypeSettingsInput', { isAbstract: true })
@ObjectType()
export class TypeSettings {
  isHome?: boolean;
  layoutType?: string;
  productCard?: string;
  bestSelling?: CompactBestSellingInput
  popularProducts?: CompactDemoPopularProductsInput
  category?: CompactDemoCategoryInput
  handpickedProducts?: CompactDemoHandpickedProductsInput
  newArrival?: CompactDemoNewArrivalInput
  authors?: CompactDemoAuthorsInput
  manufactures?: CompactDemoManufacturesInput
}
