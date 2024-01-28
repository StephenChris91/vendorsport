import { ArgsType, Field, ID } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args';

@ArgsType()
export class GetFetchRequestedProductsArgs extends PaginationArgs {
  @Field(() => ID, { nullable: true })
  vendor_request_id?: number;
  language?: string;
}
