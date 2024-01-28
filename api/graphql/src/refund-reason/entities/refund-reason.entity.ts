import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';

@InputType('RefundReasonInputType', { isAbstract: true })
@ObjectType()
export class RefundReason extends CoreEntity {
  name?: string;
  slug?: string;
  language?: string;
  translated_languages?: string[];
}