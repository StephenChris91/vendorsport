import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFaqInput } from './dto/create-faqs.input';
import { GetFaqArgs } from './dto/get-faq.args';
import { FaqPaginator, GetFaqsArgs } from './dto/get-faqs.args';
import { UpdateFaqInput } from './dto/update-faqs.input';
import { Faqs } from './entities/faqs.entity';
import { FaqsService } from './faqs.service';

@Resolver(() => Faqs)
export class FaqsResolver {
  constructor(private readonly faqsService: FaqsService) {}

  @Mutation(() => Faqs)
  createFaq(@Args('input') createFaqInput: CreateFaqInput) {
    return this.faqsService.create(createFaqInput);
  }

  @Query(() => FaqPaginator, { name: 'faqs' })
  getFaqs(@Args() getFaqsArgs: GetFaqsArgs) {
    return this.faqsService.findAll(getFaqsArgs);
  }

  @Query(() => Faqs, { name: 'faq', nullable: true })
  findOne(@Args() getFaqArgs: GetFaqArgs) {
    return this.faqsService.findOne(getFaqArgs);
  }

  @Mutation(() => Faqs)
  updateFaq(@Args('input') updateFaqInput: UpdateFaqInput) {
    return this.faqsService.update(updateFaqInput.id, updateFaqInput);
  }

  @Mutation(() => Faqs)
  deleteFaq(@Args('id', { type: () => ID }) id: number) {
    return this.faqsService.remove(id);
  }
}

