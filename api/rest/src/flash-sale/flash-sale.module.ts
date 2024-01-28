import { Module } from '@nestjs/common';
import {
  FlashSaleController,
  ProductsByFlashSaleController,
} from './flash-sale.controller';
import { FlashSaleService } from './flash-sale.service';

@Module({
  controllers: [FlashSaleController, ProductsByFlashSaleController],
  providers: [FlashSaleService],
})
export class FlashSaleModule {}
