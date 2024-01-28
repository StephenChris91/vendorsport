import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetUsersDto } from 'src/users/dto/get-users.dto';
import { UsersService } from 'src/users/users.service';
import { CreateStoreNoticeDto } from './dto/create-store-notice.dto';
import { GetStoreNoticesDto } from './dto/get-store-notices.dto';
import { UpdateStoreNoticeDto } from './dto/update-store-notice.dto';
import { StoreNoticesService } from './store-notices.service';

@Controller('store-notices')
export class StoreNoticesController {
  constructor(
    private readonly storeNoticesService: StoreNoticesService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  createStoreNotice(@Body() createStoreNoticeDto: CreateStoreNoticeDto) {
    return this.storeNoticesService.create(createStoreNoticeDto);
  }

  @Get()
  getStoreNotices(@Query() query: GetStoreNoticesDto) {
    return this.storeNoticesService.getStoreNotices(query);
  }

  @Get('getUsersToNotify')
  getAllUsers(@Query() query: GetUsersDto) {
    return this.usersService.getUsersNotify(query);
  }

  @Get(':param')
  getStoreNotice(
    @Param('param') param: string,
    @Query('language') language: string,
  ) {
    return this.storeNoticesService.getStoreNotice(param, language);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreNoticeDto: UpdateStoreNoticeDto,
  ) {
    return this.storeNoticesService.update(+id, updateStoreNoticeDto);
  }

  @Delete(':id')
  deleteStoreNotice(@Param('id') id: string) {
    return this.storeNoticesService.remove(+id);
  }
}
