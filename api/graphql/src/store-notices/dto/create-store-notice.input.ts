import { InputType, PickType } from '@nestjs/graphql';
import { StoreNotice } from '../entities/store-notices.entity';

@InputType()
export class CreateStoreNoticeInput extends PickType(StoreNotice, [
  'notice',
  'description',
  'expired_at',
  'effective_from',
  'received_by',
]) {
  type: string;
  priority: string;
}
