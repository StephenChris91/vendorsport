import { Address } from 'src/addresses/entities/address.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
// import { Order } from 'src/orders/entities/order.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Profile } from './profile.entity';

export class User extends CoreEntity {
  name: string;
  email: string;
  password?: string;
  profile?: Profile;
  shops?: Shop[];
  managed_shop?: Shop;
  is_active?: boolean = true;
  address?: Address[];
  permissions?: Permission[];
  // orders?: Order[];
  wallet?: any;
}

export class Permission extends CoreEntity {
  name?: string;
  guard_name?: string;
  pivot?: any;
}
