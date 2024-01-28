import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { GetStoreNoticesArgs } from './dto/get-store-notices.args';
import { StoreNotice } from './entities/store-notices.entity';
import storeNoticesJson from './store-notices.json';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { CreateStoreNoticeInput } from './dto/create-store-notice.input';
import { UpdateStoreNoticeInput } from './dto/update-store-notice.input';
import { ReadSingleNoticeInput } from './dto/read-notice.input';

const storeNotices = plainToClass(StoreNotice, storeNoticesJson);
const options = {
  keys: ['notice'],
  threshold: 0.3,
};
const fuse = new Fuse(storeNotices, options);

@Injectable()
export class StoreNoticesService {
  private storeNotices: StoreNotice[] = storeNotices;

  create(createStoreNoticeInput: CreateStoreNoticeInput) {
    return this.storeNotices[0];
  }
  getStoreNotices({ text, first, page }: GetStoreNoticesArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: StoreNotice[] = this.storeNotices;
    if (text?.replace(/%/g, '')) {
      const formatText = text?.replace(/%/g, '');
      data = fuse.search(formatText)?.map(({ item }) => item);
    }
    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }
  getStoreNotice(id: number) {
    return this.storeNotices.find(
      (storeNotice) => storeNotice.id === Number(id),
    );
  }
  getStoreNoticeType(role: string) {
    return `This action role a #${role} store notices`;
  }
  update(id: number, updateStoreNoticeInput: UpdateStoreNoticeInput) {
    return this.storeNotices[0];
  }
  readNotice(readSingleNoticeInput: ReadSingleNoticeInput) {
    return this.storeNotices[0];
  }
  readAllNotices(id: number) {
    return `This action receiver a  store notices`;
  }
  remove(id: number) {
    return this.storeNotices[0];
  }
}
