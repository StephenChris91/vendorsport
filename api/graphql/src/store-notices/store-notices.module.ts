import { Module } from '@nestjs/common';
import { StoreNoticesResolver } from './store-notices.resolver';
import { StoreNoticesService } from './store-notices.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [StoreNoticesResolver, StoreNoticesService, UsersService],
})
export class StoreNoticesModule {}
