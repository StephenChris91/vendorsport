import { CoreEntity } from 'src/common/entities/core.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';

export class LatestMessage extends CoreEntity {
  body: string;
  conversation_id: string;
  user_id: string;
}

export class Conversation extends CoreEntity {
  shop_id: number;
  unseen: boolean;
  user_id: string;
  user: User;
  shop: Shop;
  latest_message: LatestMessage;
}
