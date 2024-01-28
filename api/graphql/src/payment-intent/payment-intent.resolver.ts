import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { PaymentIntent } from './entities/payment-intent.entity';
import { PaymentIntentService } from './payment-intent.service';
import { GetPaymentIntentArgs } from './dto/get-payment-intent.args';

@Resolver(() => PaymentIntent)
export class PaymentIntentResolver {
  constructor(private readonly paymentIntentService: PaymentIntentService) {}
  @Query(() => PaymentIntent || null, { name: 'getPaymentIntent' })
  async getPaymentIntent(
    @Args() getPaymentIntentArgs: GetPaymentIntentArgs,
  ): Promise<PaymentIntent> {
    return this.paymentIntentService.findOne(getPaymentIntentArgs);
  }
}
