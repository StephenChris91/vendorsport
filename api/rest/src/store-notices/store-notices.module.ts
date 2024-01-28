import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { StoreNoticesController } from './store-notices.controller';
import { StoreNoticesService } from './store-notices.service';

@Module({
  controllers: [StoreNoticesController],
  providers: [StoreNoticesService, UsersService],
})
export class StoreNoticesModule {}
