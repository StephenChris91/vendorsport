import { CreateTypeInput } from './create-type.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTypeInput extends PartialType(CreateTypeInput) {
  @Field(() => ID,{ nullable: true })
  id?: number;
  language?: string;
  slug?: string;
}
