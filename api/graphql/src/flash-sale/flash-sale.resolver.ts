import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFlashSaleInput } from './dto/create-flash-sale.input';
import { GetFlashSaleArgs } from './dto/get-flash-sale.args';
import { FlashSalePaginator, GetFlashSalesArgs } from './dto/get-flash-sales.args';
import { UpdateFlashSaleInput } from './dto/update-flash-sale.input';
import { FlashSale } from './entities/flash-sale.entity';
import { FlashSaleService } from './flash-sale.service';
import { Product } from 'src/products/entities/product.entity';
import { GetProductsByFlashSaleArgs } from './dto/get-products-by-flash-sale.args';
import { ProductPaginator } from 'src/products/dto/get-products.args';
import { GetFlashSaleInfoByProductIDArgs } from './dto/get-flash-sale-info-by-product-id.args';

@Resolver(() => FlashSale)
export class FlashSaleResolver {
  constructor(private readonly flashSaleService: FlashSaleService) {}

  @Mutation(() => FlashSale)
  createFlashSale(@Args('input') createFlashSaleInput: CreateFlashSaleInput) {
    return this.flashSaleService.create(createFlashSaleInput);
  }

  // @Query(() => [FlashSalePaginator], { name: 'flashSales' })
  // findAll(@Args() getFlashSalesArgs: GetFlashSalesArgs) {
  //   return this.flashSaleService.findAll();
  // }

  @Query(() => FlashSalePaginator, { name: 'flashSales' })
  getFlashSales(@Args() getFlashSalesArgs: GetFlashSalesArgs) {
    return this.flashSaleService.getFlashSales(getFlashSalesArgs);
  }


  @Query(() => FlashSale, { name: 'flashSale' })
  findOne(@Args() getFlashSaleArgs: GetFlashSaleArgs) {
    return this.flashSaleService.findOne(getFlashSaleArgs);
  }
  @Query(() => FlashSale, { name: 'flashSaleInfoByProductID' })
  flashSaleInfoByProductID(@Args() getFlashSaleInfoByProductIDArgs: GetFlashSaleInfoByProductIDArgs) {
    return this.flashSaleService.getFlashSaleInfoByProductID(getFlashSaleInfoByProductIDArgs);
  }
  @Query(() => ProductPaginator, { name: 'productsByFlashSale' })
  productsByFlashSale(@Args() getProductsByFlashSaleArgs: GetProductsByFlashSaleArgs) {
    return this.flashSaleService.getProductsByFlashSale(getProductsByFlashSaleArgs);
  }
  // @Query(() => ProductPaginator, { name: 'productsByFlashSale' })
  // productsByFlashSale(@Args() getFlashSaleArgs: GetProductsByFlashSaleArgs) {
  //   return this.flashSaleService.getProductsByFlashSale(getFlashSaleArgs);
  // }

  @Mutation(() => FlashSale)
  updateFlashSale(@Args('input') updateFlashSaleInput: UpdateFlashSaleInput) {
    return this.flashSaleService.update(
      updateFlashSaleInput.id,
      updateFlashSaleInput,
    );
  }

  @Mutation(() => FlashSale)
  deleteFlashSale(@Args('id', { type: () => ID }) id: number) {
    return this.flashSaleService.remove(id);
  }
}
