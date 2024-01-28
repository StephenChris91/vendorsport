import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';

export class Setting extends CoreEntity {
  options: SettingsOptions;
  language: string;
  translated_languages: string[];
}

export class PopUpNotShow {
  title?: string;
  popUpExpiredIn?: number;
}

export class PromoPopup {
  image?: Attachment;
  title?: string;
  description?: string;
  popUpDelay?: number;
  popUpExpiredIn?: number;
  isPopUpNotShow?: boolean;
  popUpNotShow?: PopUpNotShow;
}

export class SettingsOptions {
  contactDetails: ContactDetails;
  currency: string;
  currencyOptions: CurrencyOptions;
  currencyToWalletRatio: number;
  defaultAi: string;
  defaultPaymentGateway: string;
  deliveryTime: DeliveryTime[];
  emailEvent: EmailEvent;
  freeShipping: boolean;
  freeShippingAmount: any;
  guestCheckout: boolean;
  isProductReview: boolean;
  logo: LogoSettings;
  maximumQuestionLimit: number;
  maxShopDistance: number;
  minimumOrderAmount: number;
  paymentGateway: PaymentGateway[];
  seo: SeoSettings;
  server_info: ServerInfo;
  shippingClass: number;
  signupPoints: number;
  siteSubtitle: string;
  siteTitle: string;
  smsEvent: SmsEvent;
  StripeCardOnly: boolean;
  taxClass: number;
  useAi: boolean;
  useCashOnDelivery: boolean;
  useEnableGateway: boolean;
  useGoogleMap: boolean;
  useMustVerifyEmail: boolean;
  useOtp: boolean;
  isUnderMaintenance: boolean;
  isPromoPopUp?: boolean;
  promoPopup?: PromoPopup;
}

export class DeliveryTime {
  title: string;
  description: string;
}

export class LogoSettings {
  id: string;
  original: string;
  thumbnail: string;
}

export class SeoSettings {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: Attachment;
  twitterHandle?: string;
  twitterCardType?: string;
  metaTags?: string;
  canonicalUrl?: string;
}

export class GoogleSettings {
  isEnable: boolean;
  tagManagerId: string;
}

export class FacebookSettings {
  isEnable: boolean;
  appId: string;
  pageId: string;
}

export class ContactDetails {
  socials: ShopSocials[];
  contact: string;
  location: Location;
  website: string;
}

export class ShopSocials {
  icon: string;
  url: string;
}

export class Location {
  lat: number;
  lng: number;
  city?: string;
  state: string;
  country: string;
  zip?: string;
  formattedAddress: string;
}

export class SmsEvent {
  admin: SmsAdmin;
  vendor: SmsVendor;
  customer: SmsCustomer;
}
export class SmsAdmin {
  refundOrder: boolean;
  paymentOrder: boolean;
  statusChangeOrder: boolean;
}

export class SmsVendor {
  refundOrder: boolean;
  paymentOrder: boolean;
  statusChangeOrder: boolean;
}

export class SmsCustomer {
  refundOrder: boolean;
  paymentOrder: boolean;
  statusChangeOrder: boolean;
}

export class EmailEvent {
  admin: EmailAdmin;
  vendor: EmailVendor;
  customer: EmailCustomer;
}
export class EmailAdmin {
  refundOrder: boolean;
  paymentOrder: boolean;
  statusChangeOrder: boolean;
}

export class EmailVendor {
  refundOrder: boolean;
  createReview: boolean;
  paymentOrder: boolean;
  createQuestion: boolean;
  statusChangeOrder: boolean;
}

export class EmailCustomer {
  refundOrder: boolean;
  paymentOrder: boolean;
  answerQuestion: boolean;
  statusChangeOrder: boolean;
}
export class ServerInfo {
  memory_limit: string;
  post_max_size: number;
  max_input_time: string;
  max_execution_time: string;
  upload_max_filesize: number;
}
export class PaymentGateway {
  name: string;
  title: string;
}
export class CurrencyOptions {
  formation: string;
  fractions: number;
}
