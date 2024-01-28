import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { CreateRefundReasonInput } from './dto/create-refund-reason.input';
import { GetRefundReasonArgs } from './dto/get-refund-reason.args';
import { GetRefundReasonsArgs } from './dto/get-refund-reasons.args';
import { UpdateRefundReasonInput } from './dto/update-refund-reason.input';
import { RefundReason } from './entities/refund-reason.entity';
import refundReasonsJson from './refund-reasons.json';

const refundReasons = plainToClass(RefundReason, refundReasonsJson);
const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(refundReasons, options);

@Injectable()
export class RefundReasonService {
  private refundReasons: RefundReason[] = refundReasons;

  create({ ...createRefundReasonInput }: CreateRefundReasonInput) {
    const newRefundReason = {
      id: this.refundReasons.length + 1,
      ...createRefundReasonInput,
      created_at: new Date(),
      updated_at: new Date(),
    };
    // TODO: Fix it
    // @ts-ignore
    this.refundReasons.push(newRefundReason);
    return newRefundReason;
  }

  findAll({ first, page, search, sortedBy }: GetRefundReasonsArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: RefundReason[] = this.refundReasons;

    if (search?.slice(10, search.length).length > 0) {
      const formatText = search?.replace(/%/g, '').slice(10, search.length);
      data = fuse.search(formatText)?.map(({ item }) => item);
    }
    data.sort(() => (sortedBy === 'ASC' ? 1 : -1));

    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(
        this.refundReasons.length,
        page,
        first,
        this.refundReasons.length,
      ),
    };
  }

  findOne(getRefundReasonArgs: GetRefundReasonArgs) {
    return this.refundReasons.find(
      (refundReason) =>
        refundReason.id === Number(getRefundReasonArgs.id) ||
        getRefundReasonArgs.slug === getRefundReasonArgs.slug,
    );
  }

  update(id: number, updateRefundReasonInput: UpdateRefundReasonInput) {
    return this.refundReasons[0];
  }

  remove(id: number) {
    return this.refundReasons[0];
  }
}
