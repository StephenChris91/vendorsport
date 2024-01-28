import settingsJson from '@db/settings.json';
import { Controller, Get, Query } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Setting } from 'src/settings/entities/setting.entity';
import { GetPaymentIntentDto } from './dto/get-payment-intent.dto';
import { PaymentIntentService } from './payment-intent.service';

const settings = plainToClass(Setting, settingsJson);

@Controller('payment-intent')
export class PaymentIntentController {
  constructor(private readonly paymentIntentService: PaymentIntentService) {}
  @Get()
  async getPaymentIntent(@Query() query: GetPaymentIntentDto) {
    console.log('payment_intent', 'payment_intent');
    return this.paymentIntentService.getPaymentIntent(query);
  }
}
