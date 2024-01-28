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
import { Coupon } from '../entities/coupon.entity';

@ObjectType()
export class CouponPaginator {
  data: Coupon[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetCouponsArgs extends PaginationArgs {
  orderBy?: string;
  sortedBy?: string;
  search?: string;
  searchJoin?: string;
  language?: string;
  @Field(() => ID, { nullable: true })
  shop_id?: number;
  type?: string;
  is_approve?: boolean;
}

@InputType()
export class QueryCouponsOrderByOrderByClause {
  column: QueryCouponsOrderByColumn;
  order: SortOrder;
}

export enum QueryCouponsOrderByColumn {
  CREATED_AT = 'created_at',
  EXPIRE_AT = 'expire_at',
  ID = 'id',
  CODE = 'code',
  AMOUNT = 'amount',
  NAME = 'title',
  DESCRIPTION = 'description',
  MINIMUM_CART_AMOUNT = 'minimum_cart_amount',
  IS_APPROVE = 'is_approve',
  TYPE = 'type',
}

registerEnumType(QueryCouponsOrderByColumn, {
  name: 'QueryCouponsOrderByColumn',
});
