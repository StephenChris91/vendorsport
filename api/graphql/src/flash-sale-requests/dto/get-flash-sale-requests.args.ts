import { ArgsType, ObjectType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { FlashSaleRequests } from '../entities/flash-sale-request.entity';

@ObjectType()
export class FlashSaleRequestPaginator {
  data: FlashSaleRequests[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetFlashSalesRequestArgs extends PaginationArgs {
  search?: string;
  orderBy?: string;
  sortedBy?: string;
  language?: string;
  searchJoin?: string;
}
