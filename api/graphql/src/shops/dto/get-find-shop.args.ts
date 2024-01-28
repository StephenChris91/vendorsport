import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetFindShopDistanceArgs {
  lat?: string;
  lng?: string;
}
