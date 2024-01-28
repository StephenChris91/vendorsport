import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';

@InputType('SettingsInputType', { isAbstract: true })
@ObjectType()
export class Settings extends CoreEntity {
  options?: SettingsOptions;
  language: string;
  translated_languages: string[];
}

@InputType('EventSettingsInputType', { isAbstract: true })
@ObjectType()
export class EventSettings {
  customer?: Customer;
  vendor?: Vendor;
  admin?: Admin;
}
@InputType('ServerInfoInputType', { isAbstract: true })
@ObjectType()
export class ServerInfo {
  memory_limit?: string;
  post_max_size?: number;
  max_input_time?: string;
  max_execution_time?: string;
  upload_max_filesize?: number;
}

@InputType('CustomerInputType', { isAbstract: true })
@ObjectType()
export class Customer {
  statusChangeOrder?: boolean;
  refundOrder?: boolean;
  paymentOrder?: boolean;
  answerQuestion?: boolean;
}

@InputType('VendorInputType', { isAbstract: true })
@ObjectType()
export class Vendor {
  statusChangeOrder?: boolean;
  refundOrder?: boolean;
  paymentOrder?: boolean;
  createReview?: boolean;
  createQuestion?: boolean;
}

@InputType('AdminInputType', { isAbstract: true })
@ObjectType()
export class Admin {
  statusChangeOrder?: boolean;
  refundOrder?: boolean;
  paymentOrder?: boolean;
}
@InputType('PaymentGatewayInputType', { isAbstract: true })
@ObjectType()
export class PaymentGateway {
  name: string;
  title: string;
}
@InputType('CurrencyOptionsInputType', { isAbstract: true })
@ObjectType()
export class CurrencyOptions {
  formation: string;
  fractions: number;
}
@InputType('DeliveryTimeInputType', { isAbstract: true })
@ObjectType()
export class DeliveryTime {
  title: string;
  description: string;
}

@InputType('SeoSettingsInputType', { isAbstract: true })
@ObjectType()
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

@InputType('GoogleSettingsInputType', { isAbstract: true })
@ObjectType()
export class GoogleSettings {
  isEnable?: boolean;
  tagManagerId?: string;
}

@InputType('FacebookSettingsInputType', { isAbstract: true })
@ObjectType()
export class FacebookSettings {
  isEnable?: boolean;
  appId?: string;
  pageId?: string;
}

@InputType('ContactDetailsInput', { isAbstract: true })
@ObjectType()
export class ContactDetails {
  socials?: ShopSocials[];
  contact?: string;
  location?: Location;
  website?: string;
  emailAddress?: string;
}

@InputType('ShopSocialInput', { isAbstract: true })
@ObjectType()
export class ShopSocials {
  icon?: string;
  url?: string;
}

@InputType('PopUpNotShowInput', { isAbstract: true })
@ObjectType()
export class PopUpNotShow {
  title?: string;
  @Field(() => Float)
  popUpExpiredIn?: number;
}

@InputType('PromoPopupInput', { isAbstract: true })
@ObjectType()
export class PromoPopup {
  image?: Attachment;
  title?: string;
  description?: string;
  @Field(() => Float)
  popUpDelay?: number;
  @Field(() => Float)
  popUpExpiredIn?: number;
  isPopUpNotShow?: boolean;
  popUpNotShow?: PopUpNotShow;
}

@InputType('LocationInput', { isAbstract: true })
@ObjectType()
export class Location {
  lat?: number;
  lng?: number;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  street_address?: string;
  formattedAddress?: string;
}
@InputType('GoogleMapLocationInput', { isAbstract: true })
@ObjectType()
export class GoogleMapLocation extends Location {
  street_number?: string;
  route?: string;
  street_address?: string;
}

@InputType('AllInputInput', { isAbstract: true })
@ObjectType()
export class AllInput {
  all?: PushNotification;
}

@InputType('PushNotificationInput', { isAbstract: true })
@ObjectType()
export class PushNotification {
  order?: boolean;
  message?: boolean;
  storeNotice?: boolean;
}
@InputType('MaintenanceInput', { isAbstract: true })
@ObjectType()
export class Maintenance {
  title?: string;
  image?: Attachment;
  description?: string;
  start?: string;
  until?: string;
  buttonTitleOne?: string;
  newsLetterTitle?: string;
  buttonTitleTwo?: string;
  contactUsTitle?: string;
  aboutUsTitle?: string;
  newsLetterDescription?: string;
  aboutUsDescription?: string;
  isOverlayColor?: boolean;
  overlayColor?: string;
  overlayColorRange?: string;
}

@InputType('SettingsOptionsInputType', { isAbstract: true })
@ObjectType()
export class SettingsOptions {
  siteTitle?: string;
  siteSubtitle?: string;
  currency?: string;
  minimumOrderAmount?: number;
  @Field(() => Int)
  currencyToWalletRatio?: number;
  @Field(() => Int)
  signupPoints?: number;
  deliveryTime?: DeliveryTime[];
  logo?: Attachment;
  useCashOnDelivery?: boolean;
  freeShipping?: boolean;
  freeShippingAmount?: number;
  taxClass?: string;
  shippingClass?: string;
  seo?: SeoSettings;
  google?: GoogleSettings;
  facebook?: FacebookSettings;
  contactDetails?: ContactDetails;
  useOtp?: boolean;
  useGoogleMap?: boolean;
  maximumQuestionLimit?: number;
  // paymentGateway?: string;
  useMustVerifyEmail?: boolean;
  maxShopDistance?: number;
  useEnableGateway?: boolean;
  useAi?: boolean;
  isProductReview?: boolean;
  StripeCardOnly?: boolean;
  guestCheckout?: boolean;
  defaultPaymentGateway?: string;
  currencyOptions?: CurrencyOptions;
  @Field(() => [PaymentGateway])
  paymentGateway?: [PaymentGateway];
  server_info?: ServerInfo;
  @Field(() => EventSettings, { nullable: true })
  smsEvent?: EventSettings;
  @Field(() => EventSettings, { nullable: true })
  emailEvent?: EventSettings;
  collapseLogo?: Attachment;
  enableTerms?: boolean;
  pushNotification?: AllInput;
  defaultAi?: string;
  siteLink?: string;
  copyrightText?: string;
  externalText?: string;
  externalLink?: string;
  isUnderMaintenance?: boolean;
  maintenance?: Maintenance;
  enableCoupons?: boolean;
  isPromoPopUp?: boolean;
  promoPopup?: PromoPopup;
}
