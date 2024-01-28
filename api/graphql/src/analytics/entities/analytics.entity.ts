import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';

@InputType('AttributeInputType', { isAbstract: true })
@ObjectType()
export class Analytics extends CoreEntity {
  totalRevenue?: number;
  totalRefunds?: number;
  totalShops?: number;
  totalVendors?: number;
  todaysRevenue?: number;
  @Field(() => Int)
  totalOrders?: number;
  @Field(() => Int)
  newCustomers?: number;
  yearlyTotalOrderByStatus?: OrderByStatus;
  monthlyTotalOrderByStatus?: OrderByStatus;
  weeklyTotalOrderByStatus?: OrderByStatus;
  todayTotalOrderByStatus?: OrderByStatus;
  totalYearSaleByMonth?: TotalYearSaleByMonth[];
}

// @InputType('TotalYearSaleByMonthInputType', { isAbstract: true })
@ObjectType()
export class TotalYearSaleByMonth {
  total?: number;
  month?: string;
}

@ObjectType()
export class OrderByStatus {
  pending?: number;
  processing?: number;
  complete?: number;
  cancelled?: number;
  refunded?: number;
  failed?: number;
  localFacility?: number;
  outForDelivery?: number;
}