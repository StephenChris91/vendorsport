import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import {
  ApproveCouponController,
  CouponsController,
  DisapproveCouponController,
} from './coupons.controller';

@Module({
  controllers: [
    CouponsController,
    ApproveCouponController,
    DisapproveCouponController,
  ],
  providers: [CouponsService],
})
export class CouponsModule {}
