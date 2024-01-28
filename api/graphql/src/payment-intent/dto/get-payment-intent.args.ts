import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetPaymentIntentArgs {
  @Field(() => ID)
  tracking_number: string;
  payment_gateway: string;
  recall_gateway: boolean;
}
