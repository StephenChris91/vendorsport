import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import {
  AnalyticsController,
  CategoryWiseProductController,
  LowStockProductsController,
  TopRateProductController,
} from './analytics.controller';

@Module({
  controllers: [
    AnalyticsController,
    CategoryWiseProductController,
    LowStockProductsController,
    TopRateProductController,
  ],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
