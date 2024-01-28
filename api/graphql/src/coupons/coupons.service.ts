import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';
import { Coupon } from './entities/coupon.entity';
import couponsJson from './coupons.json';
import Fuse from 'fuse.js';
import { GetCouponsArgs } from './dto/get-coupons.args';
import { paginate } from 'src/common/pagination/paginate';
import { GetCouponArgs } from './dto/get-coupon.args';
import {
  VerifyCouponInput,
  VerifyCouponResponse,
} from './dto/verify-coupon.input';

const coupons = plainToClass(Coupon, couponsJson);
const options = {
  keys: ['code'],
  threshold: 0.3,
};
const fuse = new Fuse(coupons, options);

@Injectable()
export class CouponsService {
  private coupons: Coupon[] = coupons;

  create(createCouponInput: CreateCouponInput) {
    return this.coupons[0];
  }

  getCoupons({ first, page, shop_id, search, sortedBy }: GetCouponsArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: Coupon[] = this.coupons;
    if (shop_id) {
      data = this.coupons.filter((p) => Number(p.shop_id) === Number(shop_id));
    }

    // Search
    if (search?.slice(5, search.length).length > 0) {
      const formatText = search?.replace(/%/g, '').slice(5, search.length);
      data = fuse.search(formatText)?.map(({ item }) => item);
    }

    // Sort by
    data.sort(function () {
      if (sortedBy === 'ASC') {
        return 1;
      } else if (sortedBy === 'DESC') {
        return -1;
      } else {
        return -1;
      }
    });

    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  getCoupon({ id, code }: GetCouponArgs): Coupon {
    if (id) {
      return this.coupons.find((p) => p.id === Number(id));
    }
    return this.coupons.find((p) => p.code === code);
  }

  update(id: number, updateCouponInput: UpdateCouponInput) {
    return this.coupons[0];
  }

  remove(id: number) {
    return this.coupons[0];
  }

  verifyCoupon(verifyCouponInput: VerifyCouponInput): VerifyCouponResponse {
    return {
      is_valid: true,
      coupon: this.coupons[0],
      message: '',
    };
  }

  approveCoupon(id: number) {
    const coupon = this.coupons.find((s) => Number(s.id) === Number(id));
    coupon.is_approve = true;
    return coupon;
  }

  disapproveCoupon(id: number) {
    const coupon = this.coupons.find((s) => Number(s.id) === Number(id));
    coupon.is_approve = false;
    return coupon;
  }
}
