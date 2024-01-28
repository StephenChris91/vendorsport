import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { NotifyLogsService } from './notify-logs.service';
import {
  GetNotifyLogsArgs,
  NotifyLogsPaginator,
} from './dto/get-notify-logs.args';
import { NotifyLogs } from './entities/notify-log.entity';
import { GetNotifyLogArgs } from './dto/get-notify-log.args';
import {
  ReadSingleNotifyLogInput,
  UpdateNotifyLogInput,
} from './dto/read-notify-log';

@Resolver()
export class NotifyLogsResolver {
  constructor(private readonly notifyLogsService: NotifyLogsService) {}

  @Query(() => NotifyLogsPaginator, { name: 'notifyLogs' })
  getNotifyLogs(@Args() getNotifyLogsArgs: GetNotifyLogsArgs) {
    return this.notifyLogsService.findAll(getNotifyLogsArgs);
  }

  @Query(() => NotifyLogs, { name: 'notifyLog', nullable: true })
  findOne(@Args() getNotifyLogArgs: GetNotifyLogArgs) {
    return this.notifyLogsService.findOne(getNotifyLogArgs);
  }

  @Mutation(() => NotifyLogs)
  readNotifyLogs(@Args('id', { type: () => ID }) id: number) {
    return this.notifyLogsService.readNotifyLog(id);
  }

  @Mutation(() => NotifyLogs)
  deleteNotifyLog(@Args('id', { type: () => ID }) id: number) {
    return this.notifyLogsService.remove(id);
  }

  @Mutation(() => [NotifyLogs])
  notifyLogAllRead(@Args('input') updateNotifyLogInput: UpdateNotifyLogInput) {
    return this.notifyLogsService.readAllNotifyLogs(
      updateNotifyLogInput.receiver,
    );
  }
}
