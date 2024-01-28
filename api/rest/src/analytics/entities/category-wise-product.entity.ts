import { CoreEntity } from 'src/common/entities/core.entity';

export class CategoryWiseProduct extends CoreEntity {
  totalRevenue?: number;
  category_name?: string;
  shop_name?: string;
  product_count?: number;
}
