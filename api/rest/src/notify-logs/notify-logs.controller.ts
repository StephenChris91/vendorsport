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
import { NotifyLogsService } from './notify-logs.service';
import { GetNotifyLogsDto } from './dto/get-notify-logs.dto';

@Controller('notify-logs')
export class NotifyLogsController {
  constructor(private notifyLogsService: NotifyLogsService) {}

  @Get()
  findAll(@Query() query: GetNotifyLogsDto) {
    return this.notifyLogsService.findAllNotifyLogs(query);
  }

  @Get(':param')
  getNotifyLog(
    @Param('param') param: string,
    @Query('language') language: string,
  ) {
    return this.notifyLogsService.getNotifyLog(param, language);
  }

  @Put(':id')
  readNotifyLogs(@Param('id') id: string) {
    return this.notifyLogsService.readNotifyLog(+id);
  }

  @Put(':id')
  notifyLogAllRead(@Param('id') id: string) {
    return this.notifyLogsService.readAllNotifyLogs(+id);
  }

  @Delete(':id')
  deleteNotifyLog(@Param('id') id: string) {
    return this.notifyLogsService.remove(+id);
  }
}
