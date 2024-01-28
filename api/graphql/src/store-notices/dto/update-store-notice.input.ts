import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateStoreNoticeInput } from './create-store-notice.input';

@InputType()
export class UpdateStoreNoticeInput extends PartialType(
  CreateStoreNoticeInput,
) {
  @Field(() => ID)
  id?: number;
}
