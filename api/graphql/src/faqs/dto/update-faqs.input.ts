import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateFaqInput } from './create-faqs.input';

@InputType()
export class UpdateFaqInput extends PartialType(CreateFaqInput) {
  @Field(() => ID)
  id: number;
  language?: string;
}
