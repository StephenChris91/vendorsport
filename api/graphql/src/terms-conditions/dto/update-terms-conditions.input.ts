import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateTermsConditionsInput } from './create-terms-conditions.input';

@InputType()
export class UpdateTermsConditionsInput extends PartialType(CreateTermsConditionsInput) {
  @Field(() => ID)
  id: number;
}
