import { Args, Resolver, Query, Mutation, ID } from '@nestjs/graphql';
import { CreateStoreNoticeInput } from './dto/create-store-notice.input';
import { GetStoreNoticeArgs } from './dto/get-store-notice.args';
import {
  GetStoreNoticeReceiverArgs,
  GetStoreNoticesArgs,
  GetStoreNoticeTypeArgs,
  StoreNoticesPaginator,
} from './dto/get-store-notices.args';
import {
  ReadAllNoticeInput,
  ReadSingleNoticeInput,
} from './dto/read-notice.input';
import { UpdateStoreNoticeInput } from './dto/update-store-notice.input';
import {
  StoreNotice,
  StoreNoticeUserPivot,
  UserToNotify,
} from './entities/store-notices.entity';
import { StoreNoticesService } from './store-notices.service';
import { UsersService } from 'src/users/users.service';

@Resolver(() => StoreNotice)
export class StoreNoticesResolver {
  constructor(
    private readonly storeNoticesService: StoreNoticesService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => StoreNotice)
  createStoreNotice(
    @Args('input') createStoreNoticeInput: CreateStoreNoticeInput,
  ) {
    return this.storeNoticesService.create(createStoreNoticeInput);
  }

  @Query(() => StoreNoticesPaginator, { name: 'storeNotices' })
  async getStoreNotices(
    @Args() getStoreNoticesArgs: GetStoreNoticesArgs,
  ): Promise<StoreNoticesPaginator> {
    return this.storeNoticesService.getStoreNotices(getStoreNoticesArgs);
  }

  @Query(() => StoreNotice, { name: 'storeNotice' })
  async getStoreNotice(
    @Args() getStoreNoticeArgs: GetStoreNoticeArgs,
  ): Promise<StoreNotice> {
    return this.storeNoticesService.getStoreNotice(getStoreNoticeArgs.id);
  }

  @Query(() => [UserToNotify], { name: 'storeNoticeReceiver' })
  getStoreNoticeReceiver(
    @Args() getStoreNoticeReceiverArgs: GetStoreNoticeReceiverArgs,
  ) {
    return this.usersService.getStoreNoticeReceiver(
      getStoreNoticeReceiverArgs.type,
    );
  }

  @Query(() => String, { name: 'storeNoticeTypes' })
  getstoreNoticeType(@Args() getStoreNoticeTypeArgs: GetStoreNoticeTypeArgs) {
    return this.storeNoticesService.getStoreNoticeType(
      getStoreNoticeTypeArgs.role,
    );
  }

  @Mutation(() => StoreNotice)
  updateStoreNotice(
    @Args('input') updateStoreNoticeInput: UpdateStoreNoticeInput,
  ) {
    return this.storeNoticesService.update(
      updateStoreNoticeInput.id,
      updateStoreNoticeInput,
    );
  }

  @Mutation(() => StoreNoticeUserPivot)
  readNotice(@Args('input') readSingleNoticeInput: ReadSingleNoticeInput) {
    return this.storeNoticesService.readNotice(readSingleNoticeInput);
  }

  @Mutation(() => StoreNotice)
  deleteStoreNotice(@Args('id', { type: () => ID }) id: number) {
    return this.storeNoticesService.remove(id);
  }

  @Mutation(() => StoreNoticeUserPivot)
  readAllNotice(@Args('input') readAllNoticeInput: ReadAllNoticeInput) {
    return this.storeNoticesService.readAllNotices(readAllNoticeInput.notices);
  }
}
