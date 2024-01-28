import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { CoreEntity } from 'src/common/entities/core.entity';

export enum RefundPolicyTarget {
  VENDOR = 'vendor',
  CUSTOMER = 'customer',
}

registerEnumType(RefundPolicyTarget, { name: 'RefundPolicyTarget' });

export enum RefundPolicyStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
}

registerEnumType(RefundPolicyStatus, { name: 'RefundPolicyStatus' });

@ObjectType()
export class RefundPoliciesPaginator {
  data: RefundPolicy[];
  paginatorInfo: PaginatorInfo;
}

@InputType('RefundPoliciesInputType', { isAbstract: true })
@ObjectType()
export class RefundPolicy extends CoreEntity {
  title?: string;
  slug?: string;
  description?: string;
  target?: RefundPolicyTarget;
  language?: string;
  status?: RefundPolicyStatus;
  @Field(() => ID)
  shop_id?: number;
  translated_languages?: string[];
}
