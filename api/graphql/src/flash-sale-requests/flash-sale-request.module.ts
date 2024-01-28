import { Module } from '@nestjs/common';
import { FlashSaleRequestResolver } from './flash-sale-request.resolver';
import { FlashSaleRequestService } from './flash-sale-request.service';

@Module({
  providers: [FlashSaleRequestResolver, FlashSaleRequestService],
})
export class FlashSaleRequestModule {}
