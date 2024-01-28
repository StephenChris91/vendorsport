import { Module } from '@nestjs/common';
import { NotifyLogsResolver } from './notify-logs.resolver';
import { NotifyLogsService } from './notify-logs.service';

@Module({
  providers: [NotifyLogsResolver, NotifyLogsService],
})
export class NotifyLogsModule {}
