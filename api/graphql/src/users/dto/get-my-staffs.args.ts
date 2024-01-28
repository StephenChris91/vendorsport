import {
  ArgsType,
  ObjectType
} from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserPaginator {
  data: User[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetMyStaffsArgs extends PaginationArgs {
  search?: string;
  orderBy?: string;
  sortedBy?: string;
  searchJoin?: string;
}