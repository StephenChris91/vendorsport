import { Field, InputType, Int, ID } from '@nestjs/graphql';

@InputType()
export class UpdateNotifyLogInput {
  @Field(() => Int)
  receiver: number;
  set_all_read: boolean;
  notify_type?: string;
}

@InputType()
export class ReadSingleNotifyLogInput {
  @Field(() => ID)
  id: number;
}
