import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { GetPaymentIntentArgs } from './dto/get-payment-intent.args';
import { PaymentIntent } from './entities/payment-intent.entity';
import paymentIntentJson from './payment-intent.json';

const paymentIntents = plainToClass(PaymentIntent, paymentIntentJson);

@Injectable()
export class PaymentIntentService {
  private paymentIntents: PaymentIntent[] = paymentIntents;
  findOne(getPaymentIntentArgs: GetPaymentIntentArgs): PaymentIntent {
    return this.paymentIntents[0];
  }
}
