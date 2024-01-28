import {
  Field,
  InputType,
  ObjectType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';
export enum StoreNoticePriority {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

registerEnumType(StoreNoticePriority, { name: 'StoreNoticePriority' });

export enum StoreNoticeType {
  ALL_VENDOR = 'all_vendor',
  SPECIFIC_VENDOR = 'specific_vendor',
  ALL_SHOP = 'all_shop',
  SPECIFIC_SHOP = 'specific_shop',
}

registerEnumType(StoreNoticeType, { name: 'StoreNoticeType' });

@InputType('StoreNoticeInputType', { isAbstract: true })
@ObjectType()
export class StoreNotice extends CoreEntity {
  priority: StoreNoticePriority;
  notice: string;
  description?: string;
  effective_from?: string;
  expired_at: string;
  type?: StoreNoticeType;
  is_read?: boolean;
  users?: User[];
  received_by?: number[];
  @Field(() => ID)
  updated_by?: number;
  @Field(() => ID)
  created_by?: number;
  expire_at: string;
  deleted_at?: string;
  creator?: User;
  creator_role?: string;
  shops?: Shop[];
  read_status?: StoreNoticeRead;
}

@InputType('StoreNoticeReadInputType', { isAbstract: true })
@ObjectType()
export class StoreNoticeRead {
  @Field(() => ID, { nullable: true })
  id: string;
  name?: string;
  email?: string;
  pivot?: StoreNoticeUserPivot;
}

@InputType('StoreNoticeUserPivotInputType', { isAbstract: true })
@ObjectType()
export class StoreNoticeUserPivot {
  @Field(() => ID, { nullable: true })
  store_notice_id: number;
  @Field(() => ID, { nullable: true })
  user_id: number;
  is_read: boolean;
}

@InputType('UserToNotifyInputType', { isAbstract: true })
@ObjectType()
export class UserToNotify {
  @Field(() => ID, { nullable: true })
  id: number;
  name?: string | null;
  slug?: string | null;
}
