import { Module } from '@nestjs/common';
import { FlashSaleResolver } from './flash-sale.resolver';
import { FlashSaleService } from './flash-sale.service';

@Module({
  providers: [FlashSaleResolver, FlashSaleService],
})
export class FlashSaleModule {}
