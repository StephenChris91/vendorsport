import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';

@InputType('TermsAndConditionsInputType', { isAbstract: true })
@ObjectType()
export class TermsAndConditions extends CoreEntity {
  @Field(() => ID)
  shop_id?: number;
  @Field(() => ID)
  user_id?: number;
  title: string;
  slug?: string;
  description?: string;
  type?: string;
  issued_by?: string;
  is_approved?: boolean;
  language?: string;
  translated_languages?: string[];
}