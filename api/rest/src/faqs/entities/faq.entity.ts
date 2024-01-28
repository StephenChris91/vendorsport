import { CoreEntity } from 'src/common/entities/core.entity';

export class Faq extends CoreEntity {
  translated_languages: string[];
  language: string;
  faq_title: string;
  slug: string;
  faq_description: string;
  shop_id?: string;
  issued_by?: string;
  faq_type?: string;
  user_id: string;
  deleted_at?: string;
}
