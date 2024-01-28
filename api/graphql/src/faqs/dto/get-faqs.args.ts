
import { ArgsType, Field, ID, ObjectType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { Faqs } from '../entities/faqs.entity';

@ObjectType()
export class FaqPaginator {
  data: Faqs[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetFaqsArgs extends PaginationArgs {
  orderBy?: string;
  text?: string;
  sortedBy?: string;
  search?: string;
  searchJoin?: string;
  @Field(() => ID, { nullable: true })
  shop_id?: number;
  faq_type?: string;
  issued_by?: string;
  language?: string;
}