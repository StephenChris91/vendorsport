
import { ArgsType, Field, ID, ObjectType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { TermsAndConditions } from '../entities/terms-conditions.entity';

@ObjectType()
export class TermsAndConditionPaginator {
  data: TermsAndConditions[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetTermsConditionsArgs extends PaginationArgs {
  search?: string;
  orderBy?: string;
  sortedBy?: string;
  language?: string;
  searchJoin?: string;
  @Field(() => ID)
  shop_id?: number;
  type?: string;
  issued_by?: string;
  is_approved?: boolean;

}