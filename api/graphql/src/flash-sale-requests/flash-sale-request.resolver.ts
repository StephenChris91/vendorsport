import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductPaginator } from 'src/products/dto/get-products.args';
import { CreateFlashSaleRequestInput } from './dto/create-flash-sale-request.input';
import { GetFlashSaleRequestArgs } from './dto/get-flash-sale-request.args';
import {
  FlashSaleRequestPaginator,
  GetFlashSalesRequestArgs,
} from './dto/get-flash-sale-requests.args';
import { GetFetchRequestedProductsArgs } from './dto/get-requested-products.args';
import { UpdateFlashSaleRequestInput } from './dto/update-flash-sale-request.input';
import { FlashSaleRequests } from './entities/flash-sale-request.entity';
import { FlashSaleRequestService } from './flash-sale-request.service';

@Resolver(() => FlashSaleRequests)
export class FlashSaleRequestResolver {
  constructor(
    private readonly flashSaleRequestService: FlashSaleRequestService,
  ) {}

  @Mutation(() => FlashSaleRequests)
  createFlashSaleRequest(
    @Args('input') createFlashSaleRequestInput: CreateFlashSaleRequestInput,
  ) {
    return this.flashSaleRequestService.create(createFlashSaleRequestInput);
  }

  @Query(() => FlashSaleRequestPaginator, { name: 'flashSaleRequests' })
  getFlashSaleRequests(
    @Args() getFlashSaleRequestArgs: GetFlashSalesRequestArgs,
  ) {
    return this.flashSaleRequestService.getFlashSaleRequests(
      getFlashSaleRequestArgs,
    );
  }

  @Query(() => FlashSaleRequests, { name: 'flashSaleRequest' })
  findOne(@Args() getFlashSaleRequestArgs: GetFlashSaleRequestArgs) {
    return this.flashSaleRequestService.findOne(getFlashSaleRequestArgs);
  }

  // @Query(() => ProductPaginator, { name: 'fetchRequestedProducts' })
  // fetchRequestedProducts(
  //   @Args() getFetchRequestedProductsArgs: GetFetchRequestedProductsArgs,
  // ) {
  //   return this.flashSaleRequestService.fetchRequestedProducts(
  //     getFetchRequestedProductsArgs,
  //   );
  // }

  @Query(() => ProductPaginator, { name: 'fetchRequestedProducts' })
  fetchRequestedProducts(@Args() getFetchRequestedProductsArgs: GetFetchRequestedProductsArgs) {
    return this.flashSaleRequestService.getFetchRequestedProducts(getFetchRequestedProductsArgs);
  }

  @Mutation(() => FlashSaleRequests)
  updateFlashSaleRequest(
    @Args('input') updateFlashSaleRequestInput: UpdateFlashSaleRequestInput,
  ) {
    return this.flashSaleRequestService.update(
      updateFlashSaleRequestInput.id,
      updateFlashSaleRequestInput,
    );
  }

  @Mutation(() => FlashSaleRequests)
  deleteFlashSaleRequest(@Args('id', { type: () => ID }) id: number) {
    return this.flashSaleRequestService.remove(id);
  }

  @Mutation(() => FlashSaleRequests)
  approveFlashSaleRequest(@Args('id', { type: () => ID }) id: number) {
    return this.flashSaleRequestService.approveFlashSaleRequest(id);
  }

  @Mutation(() => FlashSaleRequests)
  disApproveFlashSaleRequest(@Args('id', { type: () => ID }) id: number) {
    return this.flashSaleRequestService.disApproveFlashSaleRequest(id);
  }
}
