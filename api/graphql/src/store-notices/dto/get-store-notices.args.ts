import {
  ArgsType,
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { SortOrder } from 'src/common/dto/generic-conditions.input';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { StoreNotice } from '../entities/store-notices.entity';

@ObjectType()
export class StoreNoticesPaginator {
  data: StoreNotice[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetStoreNoticesArgs extends PaginationArgs {
  @Field(() => ID)
  id?: number;
  orderBy?: string;
  sortedBy?: string;
  text?: string;
  language?: string;
  search?: string;
  @Field(() => ID)
  shop_id?: number;
}

@ArgsType()
export class GetStoreNoticeReceiverArgs {
  type?: string;
}

@ArgsType()
export class GetStoreNoticeTypeArgs {
  role?: string;
}

@InputType()
export class QueryStoreNoticesOrderByOrderByClause {
  column: QueryStoreNoticesOrderByColumn;
  order: SortOrder;
}

export enum QueryStoreNoticesOrderByColumn {
  NOTICE = 'NOTICE',
  DESCRIPTION = 'DESCRIPTION',
  TYPE = 'TYPE',
  PRIORITY = 'PRIORITY',
  EXPIRE_AT = 'EXPIRE_AT',
}

registerEnumType(QueryStoreNoticesOrderByColumn, {
  name: 'QueryStoreNoticesOrderByColumn',
});
