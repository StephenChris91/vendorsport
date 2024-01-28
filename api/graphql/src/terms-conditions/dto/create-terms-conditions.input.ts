import { InputType, PickType } from '@nestjs/graphql';
import { TermsAndConditions } from '../entities/terms-conditions.entity';

@InputType()
export class CreateTermsConditionsInput extends PickType(TermsAndConditions, [
  'title',
  'description',
  'slug',
  'user_id',
  'shop_id',
  'type',
  'issued_by',
  'language',
]) {}