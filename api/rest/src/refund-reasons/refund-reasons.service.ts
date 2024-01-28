import { Injectable } from '@nestjs/common';
import refundReasonJSON from '@db/refund-reasons.json';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { RefundReason } from './entities/refund-reasons.entity';
import { UpdateRefundReasonDto } from './dto/update-refund-reasons.dto';
import { GetRefundReasonDto } from './dto/get-refund-reasons.dto';
import { CreateRefundReasonDto } from './dto/create-refund-reasons.dto';

const refundReason = plainToClass(RefundReason, refundReasonJSON);
const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(refundReason, options);

@Injectable()
export class RefundReasonsService {
  private refundReason: RefundReason[] = refundReason;

  create(createRefundPolicyDto: CreateRefundReasonDto) {
    return this.refundReason[0];
  }

  findAllRefundPolicies({ search, limit, page }: GetRefundReasonDto) {
    if (!page) page = 1;
    if (!limit) limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: RefundReason[] = this.refundReason;

    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/refund-reasons?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getRefundPolicy(param: string, language: string) {
    return this.refundReason.find((p) => p.slug === param);
  }

  update(id: number, updateRefundDto: UpdateRefundReasonDto) {
    return this.refundReason[0];
  }

  remove(id: number) {
    return `This action removes a #${id} refund Reason`;
  }
}
