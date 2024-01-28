import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRefundReasonInput } from './dto/create-refund-reason.input';
import { GetRefundReasonArgs } from './dto/get-refund-reason.args';
import { GetRefundReasonsArgs, RefundReasonsPaginator } from './dto/get-refund-reasons.args';
import { UpdateRefundReasonInput } from './dto/update-refund-reason.input';
import { RefundReason } from './entities/refund-reason.entity';
import { RefundReasonService } from './refund-reason.service';

@Resolver(() => RefundReason)
export class RefundReasonResolver {
  constructor(private readonly refundReasonService: RefundReasonService) {}

  @Mutation(() => RefundReason)
  createRefundReason(@Args('input') createRefundReasonInput: CreateRefundReasonInput) {
    return this.refundReasonService.create(createRefundReasonInput);
  }

  @Query(() => RefundReasonsPaginator, { name: 'refundReasons' })
  getRefundReasons(@Args() getRefundReasonsArgs: GetRefundReasonsArgs) {
    return this.refundReasonService.findAll(getRefundReasonsArgs);
  }

  @Query(() => RefundReason, { name: 'refundReason', nullable: true })
  findOne(@Args() getRefundReasonArgs: GetRefundReasonArgs) {
  return this.refundReasonService.findOne(getRefundReasonArgs);
}


  @Mutation(() => RefundReason)
  updateRefundReason(@Args('input') updateRefundReasonInput: UpdateRefundReasonInput) {
    return this.refundReasonService.update(updateRefundReasonInput.id, updateRefundReasonInput);
  }

  @Mutation(() => RefundReason)
  deleteRefundReason(@Args('id', { type: () => ID }) id: number) {
    return this.refundReasonService.remove(id);
  }
}
