import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';

@InputType('NotifyLogs', { isAbstract: true })
@ObjectType()
export class NotifyLogs extends CoreEntity {
  @Field(() => ID)
  receiver?: number;
  @Field(() => ID)
  sender?: number;
  notify_type?: string;
  notify_receiver_type?: string;
  is_read?: boolean;
  notify_tracker: string;
  notify_text: string;
  @Type(() => User)
  receiver_user?: User;
  @Type(() => User)
  sender_user?: User;
  deleted_at: string;
}
