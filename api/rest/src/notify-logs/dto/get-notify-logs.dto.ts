import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';
import { NotifyLogs } from '../entities/notify-logs.entity';

export class NotifyLogsPaginator extends Paginator<NotifyLogs> {
  data: NotifyLogs[];
}

export class GetNotifyLogsDto extends PaginationArgs {
  orderBy?: QueryReviewsOrderByColumn;
  sortedBy?: SortOrder;
  search?: string;
  receiver?: number;
}

export enum QueryReviewsOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
}
