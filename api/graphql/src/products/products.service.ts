import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateProductInput } from './dto/create-product.input';
import { GetProductArgs } from './dto/get-product.args';
import { GetProductsArgs, ProductPaginator } from './dto/get-products.args';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import productsJson from './products.json';
import bestSellingProductsJson from './bestselling-products.json';
import categoryWiseProductJson from './category-wise-products.json';
import categoryWiseProductSaleJson from './category-wise-products.json';
import lowStockProductsJson from './low-stock-products.json';
import topRatedProductJson from './top-rated-products.json';
import draftProductsJson from './draft-products.json';
import stockProductsJson from './stock-products.json';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { GetPopularProductsArgs } from './dto/get-popular-products.args';
import { GetWishlistProductsArgs } from './dto/get-wishlist-products.args';
import { CreateWishlistInput } from './dto/create-wishlist.input';
import { GetBestSellingProductsArgs } from './dto/get-best-selling-product.args';
import { GetCategoryWiseProductsArgs } from './dto/get-category-wise-product.args';
import { GetCategoryWiseProductsSaleArgs } from './dto/get-category-wise-product-sale.args';
import { GetLowStockProductsArgs } from './dto/get-low-stock-product.args';
import { GetTopRatedProductsArgs } from './dto/get-top-rated-products.args';
import { GetProductsStockArgs } from './dto/get-products-stock.args';
import { GetProductsDraftArgs } from './dto/get-products-draft.args copy';
import { CategoryWiseProduct } from './entities/category-wise-products.entity';
import { TopRatedProduct } from './entities/top-rated-products.entity';
import { CategoryWiseProductSale } from './entities/category-wise-products-sale.entity';

const products = plainToClass(Product, productsJson);
// const products: Product[] = plainToClass(Product, productsJson);
const bestSellingProducts = plainToClass(Product, bestSellingProductsJson);
const categoryWiseProducts = plainToClass(
  CategoryWiseProduct,
  categoryWiseProductJson,
);
const categoryWiseProductsSale = plainToClass(
  CategoryWiseProductSale,
  categoryWiseProductJson,
);
const lowStockProducts = plainToClass(Product, lowStockProductsJson);
const topRatedProduct = plainToClass(TopRatedProduct, topRatedProductJson);
// const draftProducts = plainToClass(Product, draftProductsJson);
// const stockProducts = plainToClass(Product, stockProductsJson);

const options = {
  keys: [
    'name',
    'type.slug',
    'categories.slug',
    'tags.slug',
    'status',
    'author.slug',
    'manufacturer.slug',
    'shop_id',
  ],
  threshold: 0.3,
};
const fuse = new Fuse(products, options);

@Injectable()
export class ProductsService {
  private products: Product[] = products;
  private bestSellingProducts: Product[] = bestSellingProducts;
  private categoryWiseProducts: CategoryWiseProduct[] = categoryWiseProducts;
  private categoryWiseProductsSale: CategoryWiseProductSale[] =
    categoryWiseProductsSale;
  private lowStockProducts: Product[] = lowStockProducts;
  private topRatedProduct: TopRatedProduct[] = topRatedProduct;

  // private draftProducts: Product[] = draftProducts;
  // private stockProducts: Product[] = stockProducts;

  create(createProductInput: CreateProductInput) {
    return this.products[0];
  }

  // products?searchJoin=and&with=categories;shop;type;variations;variations.attribute.values;manufacturer;variation_options;tags;author&limit=30000000&language=en&search=
  getProducts({
    text,
    first,
    page,
    hasType,
    hasCategories,
    hasTags,
    hasAuthor,
    hasManufacturer,
    status,
    shop_id,
    search,
  }: GetProductsArgs): ProductPaginator {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: Product[] = this.products;
    // if (status) {
    //   data = fuse.search(status)?.map(({ item }) => item);
    // }

    const searchParams: any = [];

    if (text?.replace(/%/g, '')) {
      const formatText = text?.replace(/%/g, '');
      data = fuse.search(formatText)?.map(({ item }) => item);
    }
    if (hasType?.value) {
      searchParams.push({
        'type.slug': hasType?.value,
      });
    }

    if (hasCategories?.value) {
      searchParams.push({
        $or: hasCategories?.value?.map((tag) => ({
          'categories.slug': tag,
        })),
      });
    }

    if (hasTags?.value) {
      searchParams.push({
        $or: hasTags?.value?.map((tag) => ({
          'tags.slug': tag,
        })),
      });
    }

    if (hasAuthor?.value) {
      searchParams.push({
        $or: hasAuthor?.value?.map((tag) => ({
          'author.slug': tag,
        })),
      });
    }

    if (hasManufacturer?.value) {
      searchParams.push({
        $or: hasManufacturer?.value?.map((tag) => ({
          'manufacturer.slug': tag,
        })),
      });
    }

    if (searchParams?.length > 0) {
      data = fuse
        .search({
          $and: searchParams,
        })
        ?.map(({ item }) => item);
    }

    if (shop_id) {
      data = this.products.filter((p) => p.shop_id === Number(shop_id));
    }

    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        searchText.push({
          [key]: value,
        });
      }

      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  getProduct({ id, slug }: GetProductArgs): Product {
    if (id) {
      return this.products.find((p) => p.id === Number(id));
    }
    return this.products.find((p) => p.slug === slug);
  }

  getRelatedProducts({ id, slug }: GetProductArgs): Product[] {
    return this.products?.filter((p) => p.type.slug === slug).slice(0, 10);
  }

  getPopularProducts({ limit, type_slug }: GetPopularProductsArgs): Product[] {
    let data: Product[] = this.products;

    if (type_slug) {
      data = fuse.search(type_slug as unknown)?.map(({ item }) => item);
    }

    return data.slice(0, limit);
  }
  // getTopRatedProduct({ limit }: GetTopRatedProductsArgs): Product[] {
  //   let data: Product[] = this.products;

  //   return data.slice(0, limit);
  // }
  // getCategoryWiseProductSale({
  //   limit,
  // }: GetCategoryWiseProductsSaleArgs): Product[] {
  //   let data: Product[] = this.products;

  //   return data.slice(0, limit);
  // }

  getWishlistProducts({ page, first }: GetWishlistProductsArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    const data: Product[] = this.products.slice(1, 15);
    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  inWishlist(product_id: number) {
    const product = this.products.find((p) => p.id === Number(product_id));

    return product?.in_wishlist;
  }

  toggleWishlist({ product_id }: CreateWishlistInput) {
    const product = this.products.find((p) => p.id === Number(product_id));

    product.in_wishlist = !product?.in_wishlist;

    return product.in_wishlist;
  }

  deleteWishlist(slug: string) {
    return true;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return this.products[0];
  }

  remove(id: number) {
    return this.products.find((p) => p.id === id);
  }

  getBestSellingProduct(bestSellingProducts: GetBestSellingProductsArgs) {
    return this.bestSellingProducts;
  }
  getCategoryWiseProduct(
    getCategoryWiseProductsArgs: GetCategoryWiseProductsArgs,
  ) {
    return this.categoryWiseProducts;
  }
  getLowStockProducts(getLowStockProductsArgs: GetLowStockProductsArgs) {
    return this.lowStockProducts;
  }
  getTopRatedProducts(getTopRatedProductsArgs: GetTopRatedProductsArgs) {
    return this.topRatedProduct;
  }
  getCategoryWiseProductSale(
    getCategoryWiseProductsSaleArgs: GetCategoryWiseProductsSaleArgs,
  ) {
    return this.categoryWiseProductsSale;
  }

  getProductsStock({
    text,
    first,
    page,
    hasType,
    hasCategories,
    hasTags,
    hasAuthor,
    hasManufacturer,
    status,
    shop_id,
    search,
  }: GetProductsArgs): ProductPaginator {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: Product[] = this.products;
    // if (status) {
    //   data = fuse.search(status)?.map(({ item }) => item);
    // }

    const searchParams: any = [];

    if (text?.replace(/%/g, '')) {
      const formatText = text?.replace(/%/g, '');
      data = fuse.search(formatText)?.map(({ item }) => item);
    }
    if (hasType?.value) {
      searchParams.push({
        'type.slug': hasType?.value,
      });
    }

    if (hasCategories?.value) {
      searchParams.push({
        $or: hasCategories?.value?.map((tag) => ({
          'categories.slug': tag,
        })),
      });
    }

    if (hasTags?.value) {
      searchParams.push({
        $or: hasTags?.value?.map((tag) => ({
          'tags.slug': tag,
        })),
      });
    }

    if (hasAuthor?.value) {
      searchParams.push({
        $or: hasAuthor?.value?.map((tag) => ({
          'author.slug': tag,
        })),
      });
    }

    if (hasManufacturer?.value) {
      searchParams.push({
        $or: hasManufacturer?.value?.map((tag) => ({
          'manufacturer.slug': tag,
        })),
      });
    }

    if (searchParams?.length > 0) {
      data = fuse
        .search({
          $and: searchParams,
        })
        ?.map(({ item }) => item);
    }

    if (shop_id) {
      data = this.products.filter((p) => p.shop_id === Number(shop_id));
    }

    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        searchText.push({
          [key]: value,
        });
      }

      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }
  getProductsDraft({
    text,
    first,
    page,
    hasType,
    hasCategories,
    hasTags,
    hasAuthor,
    hasManufacturer,
    status,
    shop_id,
    search,
  }: GetProductsArgs): ProductPaginator {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: Product[] = this.products;
    // if (status) {
    //   data = fuse.search(status)?.map(({ item }) => item);
    // }

    const searchParams: any = [];

    if (text?.replace(/%/g, '')) {
      const formatText = text?.replace(/%/g, '');
      data = fuse.search(formatText)?.map(({ item }) => item);
    }
    if (hasType?.value) {
      searchParams.push({
        'type.slug': hasType?.value,
      });
    }

    if (hasCategories?.value) {
      searchParams.push({
        $or: hasCategories?.value?.map((tag) => ({
          'categories.slug': tag,
        })),
      });
    }

    if (hasTags?.value) {
      searchParams.push({
        $or: hasTags?.value?.map((tag) => ({
          'tags.slug': tag,
        })),
      });
    }

    if (hasAuthor?.value) {
      searchParams.push({
        $or: hasAuthor?.value?.map((tag) => ({
          'author.slug': tag,
        })),
      });
    }

    if (hasManufacturer?.value) {
      searchParams.push({
        $or: hasManufacturer?.value?.map((tag) => ({
          'manufacturer.slug': tag,
        })),
      });
    }

    if (searchParams?.length > 0) {
      data = fuse
        .search({
          $and: searchParams,
        })
        ?.map(({ item }) => item);
    }

    if (shop_id) {
      data = this.products.filter((p) => p.shop_id === Number(shop_id));
    }

    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        searchText.push({
          [key]: value,
        });
      }

      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }
}
