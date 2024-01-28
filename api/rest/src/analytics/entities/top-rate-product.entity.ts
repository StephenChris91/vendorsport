import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';

export class TopRateProduct extends CoreEntity {
  name?: string;
  slug?: string;
  regular_price?: number;
  sale_price?: number;
  min_price?: number;
  max_price?: number;
  product_type?: string;
  description?: string;
  type_id?: number;
  type_slug?: string;
  total_rating?: number;
  rating_count?: number;
  actual_rating?: number;
  image?: Attachment;
}
