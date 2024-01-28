// import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
// import { CoreEntity } from 'src/common/entities/core.entity';
// import { Shop } from 'src/shops/entities/shop.entity';

// @InputType('FaqsInputType', { isAbstract: true })
// @ObjectType()
// export class Faqs extends CoreEntity {
//   @Field(() => ID)
//   shop_id?: number;
//   faq_title?: string;
//   slug?: string;
//   faq_description?: string;
//   faq_type?: string;
//   issued_by?: string;
//   shop?: Shop;
//   @Field(() => ID, { nullable: true })
//   user_id?: number;
//   language?: string;
//   translated_languages: string[];
//   @Field()
//   description: string;

//   @Field()
//   data: string;
// }

import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Shop } from 'src/shops/entities/shop.entity';

@InputType('FaqInputType', { isAbstract: true })
@ObjectType()
export class Faqs extends CoreEntity {
  @Field(() => ID, { nullable: true })
  shop_id?: number;
  faq_title?: string;
  slug?: string;
  faq_description?: string;
  faq_type?: string;
  issued_by?: string;
  shop?: Shop;
  @Field(() => ID, { nullable: true })
  user_id?: number;
  language?: string;
  translated_languages?: string[];
}
