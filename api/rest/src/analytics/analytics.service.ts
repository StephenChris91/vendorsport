import { Injectable } from '@nestjs/common';
import analyticsJson from '@db/analytics.json';
import categoryWiseProductJson from '@db/category-wise-product.json';
import lowStockProductsJson from '@db/low-stock-products.json';
import topRateProductJson from '@db/top-rate-product.json';
import { plainToClass } from 'class-transformer';
import { Analytics } from './entities/analytics.entity';
import { CategoryWiseProduct } from './entities/category-wise-product.entity';
import { Product } from 'src/products/entities/product.entity';
import { TopRateProduct } from './entities/top-rate-product.entity';

const analytics = plainToClass(Analytics, analyticsJson);

const categoryWiseProduct = plainToClass(
  CategoryWiseProduct,
  categoryWiseProductJson,
);

const lowStockProducts = plainToClass(Product, lowStockProductsJson);

const topRateProduct = plainToClass(TopRateProduct, topRateProductJson);

@Injectable()
export class AnalyticsService {
  private analytics = analytics;
  private categoryWiseProduct = categoryWiseProduct;
  private lowStockProducts: Product[] = lowStockProducts;
  private topRateProduct: TopRateProduct[] = topRateProduct;

  findAll() {
    return this.analytics;
  }

  findAllCategoryWiseProduct() {
    return this.categoryWiseProduct;
  }

  findAllLowStockProducts() {
    return this.lowStockProducts;
  }

  findAllTopRateProduct() {
    return this.topRateProduct;
  }
}
