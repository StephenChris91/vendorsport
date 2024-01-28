export class GetPaymentIntentDto {
  tracking_number: number;
  payment_gateway: string;
  recall_gateway: boolean;
}
