import { Injectable } from '@nestjs/common';
import flashSaleJSON from '@db/flash-sale.json';
import ProductsByFlashSaleJSON from '@db/products-by-flash-sale.json';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { FlashSale } from './entities/flash-sale.entity';
import { GetFlashSaleDto } from './dto/get-flash-sales.dto';
import { CreateFlashSaleDto } from './dto/create-flash-sale.dto';
import { UpdateFlashSaleDto } from './dto/update-flash-sale.dto';
import { Product } from 'src/products/entities/product.entity';

const flashSale = plainToClass(FlashSale, flashSaleJSON);
const options = {
  keys: ['title'],
  threshold: 0.3,
};
const fuse = new Fuse(flashSale, options);

const productsByFlashSale = plainToClass(Product, ProductsByFlashSaleJSON);
const productsByFlashSaleOptions = {
  keys: ['name'],
  threshold: 0.3,
};
const productsByFlashSaleFuse = new Fuse(
  productsByFlashSale,
  productsByFlashSaleOptions,
);

@Injectable()
export class FlashSaleService {
  private flashSale: FlashSale[] = flashSale;
  private productsByFlashSale: Product[] = productsByFlashSale;

  create(createFlashSaleDto: CreateFlashSaleDto) {
    return this.flashSale[0];
  }

  findAllFlashSale({ search, limit, page }: GetFlashSaleDto) {
    if (!page) page = 1;
    if (!limit) limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: FlashSale[] = this.flashSale;

    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/flash-sale?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getFlashSale(param: string, language: string) {
    return this.flashSale.find((p) => p.slug === param);
  }

  update(id: number, updateFlashSaleDto: UpdateFlashSaleDto) {
    return this.flashSale[0];
  }

  remove(id: number) {
    return `This action removes a #${id} Flash Sale`;
  }

  findAllProductsByFlashSale({ search, limit, page }: GetFlashSaleDto) {
    if (!page) page = 1;
    if (!limit) limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let productsByData: Product[] = this.productsByFlashSale;

    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        productsByData = productsByFlashSaleFuse
          .search(value)
          ?.map(({ item }) => item);
      }
    }

    const results = productsByData.slice(startIndex, endIndex);
    const url = `/products-by-flash-sale?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(productsByData.length, page, limit, results.length, url),
    };
  }
}
