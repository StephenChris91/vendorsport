import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateFlashSaleInput } from './dto/create-flash-sale.input';
import { GetFlashSaleArgs } from './dto/get-flash-sale.args';
import { UpdateFlashSaleInput } from './dto/update-flash-sale.input';
import { FlashSale } from './entities/flash-sale.entity';
import flashSalesJson from './flash-sale.json';
import productsJson from '../products/products.json';
import { GetProductsByFlashSaleArgs } from './dto/get-products-by-flash-sale.args';
import { GetFlashSalesArgs } from './dto/get-flash-sales.args';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { Product } from 'src/products/entities/product.entity';
import { GetProductsArgs } from 'src/products/dto/get-products.args';
import { GetFlashSaleInfoByProductIDArgs } from './dto/get-flash-sale-info-by-product-id.args';


const flashSale = plainToClass(FlashSale, flashSalesJson);
const products = plainToClass(Product, productsJson);
const fuse = new Fuse(flashSale);
@Injectable()
export class FlashSaleService {
  private flashSale: FlashSale[] = flashSale;
  private products: Product[] = products;

  create(createFlashSaleInput: CreateFlashSaleInput) {
    return this.flashSale[0];
  }
  getFlashSales({ search, first, page }: GetFlashSalesArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: FlashSale[] = this.flashSale;
    if (search?.replace(/%/g, '')) {
      const formatText = search?.replace(/%/g, '');
      data = fuse.search(formatText)?.map(({ item }) => item);
    }
    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  findOne({ id, slug }: GetFlashSaleArgs) {
    if (id) {
      return this.flashSale.find((p) => p.id === Number(id));
    }
    return this.flashSale.find((p) => p.slug === slug);
  }
  getFlashSaleInfoByProductID({ id}: GetFlashSaleInfoByProductIDArgs) {
      return this.flashSale.find((p) => p.id === Number(id));
  }

  // getProductsByFlashSale({ slug, search }: GetProductsByFlashSaleArgs) {
  //   return this.flashSale;
  // }
  getProductsByFlashSale({ search, first, page }: GetProductsArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: Product[] = this.products;
    if (search?.replace(/%/g, '')) {
      const formatText = search?.replace(/%/g, '');
    }
    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  update(id: number, updateFlashSaleInput: UpdateFlashSaleInput) {
    return this.flashSale;
  }

  remove(id: number) {
    return `This action removes a #${id} attribute`;
  }
}
