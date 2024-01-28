import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTermsConditionsInput } from './dto/create-terms-conditions.input';
import { GetTermsConditionsArgs, TermsAndConditionPaginator } from './dto/get-terms-conditions.args';
import { GetTermsConditionArgs } from './dto/get-terms-condition.args';
import { UpdateTermsConditionsInput } from './dto/update-terms-conditions.input';
import { TermsAndConditions } from './entities/terms-conditions.entity';
import { TermsAndConditionService } from './terms-conditions.service';

@Resolver(() => TermsAndConditions)
export class TermsAndConditionResolver {
  constructor(private readonly termsAndConditionService: TermsAndConditionService) {}

  @Mutation(() => TermsAndConditions)
  createTermsConditions(@Args('input') createTermsConditionsInput: CreateTermsConditionsInput) {
    return this.termsAndConditionService.create(createTermsConditionsInput);
  }

  @Query(() => TermsAndConditionPaginator, { name: 'termsConditions' })
  getTermsAndConditions(@Args() getTermsConditionsArgs: GetTermsConditionsArgs) {
    return this.termsAndConditionService.findAll(getTermsConditionsArgs);
  }

  @Query(() => TermsAndConditions, { name: 'termsCondition', nullable: true })
  findOne(@Args() getTermsConditionArgs: GetTermsConditionArgs) {
  return this.termsAndConditionService.findOne(getTermsConditionArgs);
}


  @Mutation(() => TermsAndConditions)
  updateTermsConditions(@Args('input') updateTermsConditionsInput: UpdateTermsConditionsInput) {
    return this.termsAndConditionService.update(updateTermsConditionsInput.id, updateTermsConditionsInput);
  }

  @Mutation(() => TermsAndConditions)
  deleteTermsConditions(@Args('id', { type: () => ID }) id: number) {
    return this.termsAndConditionService.remove(id);
  }

  @Mutation(() => TermsAndConditions)
  approveTermsConditions(@Args('id', { type: () => ID }) id: number) {
    return this.termsAndConditionService.approve(id);
  }

  @Mutation(() => TermsAndConditions)
  disApproveTermsConditions(@Args('id', { type: () => ID }) id: number) {
    return this.termsAndConditionService.disApprove(id);
  }
}
