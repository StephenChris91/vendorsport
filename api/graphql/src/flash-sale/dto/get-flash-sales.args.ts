import {
  ArgsType,
  ObjectType
} from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { FlashSale } from '../entities/flash-sale.entity';

@ObjectType()
export class FlashSalePaginator {
  data: FlashSale[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetFlashSalesArgs extends PaginationArgs {
  orderBy?: string;
  sortedBy?: string;
  language?: string;
  search?: string;
  searchJoin?: string;
  hasProducts?: string;
  request_from?: string
}
