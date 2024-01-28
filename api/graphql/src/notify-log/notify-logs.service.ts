import { Injectable } from '@nestjs/common';
import { GetNotifyLogsArgs } from './dto/get-notify-logs.args';
import { NotifyLogs } from './entities/notify-log.entity';
import { paginate } from 'src/common/pagination/paginate';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { GetNotifyLogArgs } from './dto/get-notify-log.args';
import { ReadSingleNotifyLogInput } from './dto/read-notify-log';

const notifyLogs = plainToClass(NotifyLogs, []);
const options = {
  keys: ['notify_type'],
  threshold: 0.3,
};
const fuse = new Fuse(notifyLogs, options);

@Injectable()
export class NotifyLogsService {
  private notifyLogs: NotifyLogs[] = [];

  findAll({ notify_type, first, page }: GetNotifyLogsArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: NotifyLogs[] = this.notifyLogs;
    if (notify_type?.replace(/%/g, '')) {
      const formatText = notify_type?.replace(/%/g, '');
      data = fuse.search(formatText)?.map(({ item }) => item);
    }
    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(
        this.notifyLogs.length,
        page,
        first,
        this.notifyLogs.length,
      ),
    };
  }

  findOne(getNotifyLogArgs: GetNotifyLogArgs) {
    return this.notifyLogs.find(
      (item) => item.id === Number(getNotifyLogArgs.id),
    );
  }

  readNotifyLog(id: number) {
    return this.notifyLogs[0];
  }

  readAllNotifyLogs(id: number) {
    return `This action receiver a  notices`;
  }

  remove(id: number) {
    return this.notifyLogs[0];
  }
}
