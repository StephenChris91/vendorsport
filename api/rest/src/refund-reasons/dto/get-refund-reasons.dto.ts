import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';
import { RefundReason } from '../entities/refund-reasons.entity';

export class RefundReasonPaginator extends Paginator<RefundReason> {
  data: RefundReason[];
}

export class GetRefundReasonDto extends PaginationArgs {
  orderBy?: QueryReviewsOrderByColumn;
  sortedBy?: SortOrder;
  search?: string;
}

export enum QueryReviewsOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
  NAME = 'name',
}
