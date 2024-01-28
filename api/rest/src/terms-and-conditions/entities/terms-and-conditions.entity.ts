import { CoreEntity } from 'src/common/entities/core.entity';

export class TermsAndConditions extends CoreEntity {
  translated_languages: string[];
  language: string;
  title: string;
  slug: string;
  description: string;
  shop_id?: string;
  type?: string;
  issued_by?: string;
  user_id: string;
  deleted_at?: string;
  is_approved?: boolean;
}
