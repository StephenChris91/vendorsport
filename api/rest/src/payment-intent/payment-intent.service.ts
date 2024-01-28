import taxesJson from '@db/taxes.json';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PaymentIntent } from './entries/payment-intent.entity';
import ordersJson from '@db/orders.json';
import { Order } from 'src/orders/entities/order.entity';
import { GetPaymentIntentDto } from './dto/get-payment-intent.dto';

const orders = plainToClass(Order, ordersJson);
const paymentIntents = plainToClass(PaymentIntent, taxesJson);

@Injectable()
export class PaymentIntentService {
  private paymentIntents: PaymentIntent[] = paymentIntents;
  getPaymentIntent(query: GetPaymentIntentDto) {
    const order = [...orders].find(
      (or) => or.tracking_number === ('334983046149' as string),
    );
    if (order?.payment_intent?.id) {
      return order.payment_intent;
    }
    return {
      id: 6,
      order_id: 35,
      tracking_number: '20230728840046',
      payment_gateway: 'Stripe',
      payment_intent_info: {
        payment_id: 'null',
        is_redirect: false,
        client_secret: '',
      },
    };
  }
}
