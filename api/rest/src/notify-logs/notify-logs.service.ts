import { Injectable } from '@nestjs/common';
import { NotifyLogs } from './entities/notify-logs.entity';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { GetNotifyLogsDto } from './dto/get-notify-logs.dto';

const notifyLogs = plainToClass(NotifyLogs, []);
const options = {
  keys: ['notify_type'],
  threshold: 0.3,
};
const fuse = new Fuse(notifyLogs, options);

@Injectable()
export class NotifyLogsService {
  private notifyLogs: NotifyLogs[] = notifyLogs;

  findAllNotifyLogs({ search, limit, page }: GetNotifyLogsDto) {
    if (!page) page = 1;
    if (!limit) limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: NotifyLogs[] = this.notifyLogs;

    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/notify-logs?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getNotifyLog(param: string, language: string) {
    return this.notifyLogs.find((p) => p.id === Number(param));
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
