
import { ArgsType, ObjectType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { RefundReason } from '../entities/refund-reason.entity';

@ObjectType()
export class RefundReasonsPaginator {
  data: RefundReason[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetRefundReasonsArgs extends PaginationArgs {
  search?: string;
  orderBy?: string;
  sortedBy?: string;
  language?: string;
  searchJoin?: string;

}