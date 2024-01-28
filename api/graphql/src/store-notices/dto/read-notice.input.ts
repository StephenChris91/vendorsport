import { Field, InputType, Int, ID } from '@nestjs/graphql';

@InputType()
export class ReadAllNoticeInput {
  @Field(() => Int)
  notices: number;
}

@InputType()
export class ReadSingleNoticeInput {
  @Field(() => ID)
  id?: number;
}
