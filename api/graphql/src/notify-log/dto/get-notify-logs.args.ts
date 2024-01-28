//

import { ArgsType, Field, ID, ObjectType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { NotifyLogs } from '../entities/notify-log.entity';

@ObjectType()
export class NotifyLogsPaginator {
  data: NotifyLogs[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetNotifyLogsArgs extends PaginationArgs {
  searchJoin?: string;
  notify_type?: string;
  orderBy?: string;
  sortedBy?: string;
  search?: string;
  @Field(() => ID, { nullable: true })
  receiver?: number;
}
