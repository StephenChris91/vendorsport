import { CoreEntity } from 'src/common/entities/core.entity';

export class RefundReason extends CoreEntity {
  name: string;
  slug: string;
  language: string;
  translated_languages: Array<string>;
  deleted_at?: string;
}
