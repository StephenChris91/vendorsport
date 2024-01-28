import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRefundPolicyInput } from './dto/create-refund-policies.input';
import { GetRefundPoliciesArgs, RefundPoliciesPaginator } from './dto/get-refund-policies.args';
import { GetRefundPolicyArgs } from './dto/get-refund-policy.args';
import { RefundPolicy } from './entities/refund-policies.entity';
import { RefundPoliciesService } from './refund-policies.service';
import { UpdateRefundPolicyInput } from './dto/update-refund-policies.input';

@Resolver(() => RefundPolicy)
export class RefundPoliciesResolver {
  constructor(private readonly refundPoliciesService: RefundPoliciesService) {}

  @Mutation(() => RefundPolicy)
  createRefundPolicy(@Args('input') createRefundPolicyInput: CreateRefundPolicyInput) {
    return this.refundPoliciesService.create(createRefundPolicyInput);
  }

  @Query(() => RefundPoliciesPaginator, { name: 'refundPolicies' })
  getRefundPolicies(@Args() getRefundPoliciesArgs: GetRefundPoliciesArgs) {
    return this.refundPoliciesService.findAll(getRefundPoliciesArgs);
  }

  @Query(() => RefundPolicy, { name: 'refundPolicy' })
  findOne(@Args() getRefundPolicyArgs: GetRefundPolicyArgs) {
    return this.refundPoliciesService.findOne(getRefundPolicyArgs);
  }


  @Mutation(() => RefundPolicy)
  updateRefundPolicy(@Args('input') updateRefundPolicyInput: UpdateRefundPolicyInput) {
    return this.refundPoliciesService.update(updateRefundPolicyInput.id, updateRefundPolicyInput);
  }

  @Mutation(() => RefundPolicy)
  deleteRefundPolicy(@Args('id', { type: () => ID }) id: number) {
    return this.refundPoliciesService.remove(id);
  }
}
