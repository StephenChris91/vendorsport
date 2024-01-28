
import { ArgsType, Field, ID, ObjectType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { RefundPolicy } from '../entities/refund-policies.entity';

@ObjectType()
export class RefundPoliciesPaginator {
  data: RefundPolicy[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetRefundPoliciesArgs extends PaginationArgs {
  orderBy?: string;
  text?: string;
  sortedBy?: string;
  search?: string;
  searchJoin?: string;
  @Field(() => ID, { nullable: true })
  shop_id?: number;
  language?: string;
}
