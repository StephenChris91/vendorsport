import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { GetProductsArgs } from 'src/products/dto/get-products.args';
import { Product } from 'src/products/entities/product.entity';
import productsJson from '../products/products.json';
import { CreateFlashSaleRequestInput } from './dto/create-flash-sale-request.input';
import { GetFlashSaleRequestArgs } from './dto/get-flash-sale-request.args';
import { GetFlashSalesRequestArgs } from './dto/get-flash-sale-requests.args';
import { UpdateFlashSaleRequestInput } from './dto/update-flash-sale-request.input';
import { FlashSaleRequests } from './entities/flash-sale-request.entity';
import flashSalesJson from './flash-sale-request.json';

const flashSaleRequest = plainToClass(FlashSaleRequests, flashSalesJson);
const products = plainToClass(Product, productsJson);
const fuse = new Fuse(flashSaleRequest);
@Injectable()
export class FlashSaleRequestService {
  private flashSaleRequest: FlashSaleRequests[] = flashSaleRequest;
  private products: Product[] = products;

  create(createFlashSaleRequestInput: CreateFlashSaleRequestInput) {
    return this.flashSaleRequest[0];
  }
  getFlashSaleRequests({ search, first, page }: GetFlashSalesRequestArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: FlashSaleRequests[] = this.flashSaleRequest;
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

  findOne({ id }: GetFlashSaleRequestArgs) {
    if (id) {
      return this.flashSaleRequest.find((p) => p.id === Number(id));
    }
  }


  getFetchRequestedProducts({ search, first, page }: GetProductsArgs) {
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

  update(id: number, updateFlashSaleRequestInput: UpdateFlashSaleRequestInput) {
    return this.flashSaleRequest;
  }

  remove(id: number) {
    return this.flashSaleRequest[0];
  }

  approveFlashSaleRequest(id: number) {
    const flashSaleRequest = this.flashSaleRequest.find(
      (s) => s.id === Number(id),
    );
    flashSaleRequest.request_status = false;

    return flashSaleRequest;
  }

  disApproveFlashSaleRequest(id: number) {
    const flashSaleRequest = this.flashSaleRequest.find(
      (s) => s.id === Number(id),
    );
    flashSaleRequest.request_status = true;

    return flashSaleRequest;
  }
}
