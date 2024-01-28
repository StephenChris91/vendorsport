import { ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args';

@ArgsType()
export class GetConversationsArgs extends PaginationArgs {
  orderBy?: string;
  sortedBy?: string;
  search?: string;
}
