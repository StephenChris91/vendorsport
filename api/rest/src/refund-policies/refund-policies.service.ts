import { Injectable } from '@nestjs/common';
import refundPolicyJSON from '@db/refund-policies.json';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { RefundPolicy } from './entities/refund-policies.entity';
import { CreateRefundPolicyDto } from './dto/create-refund-policy.dto';
import { GetRefundPolicyDto } from './dto/get-refund-policies.dto';
import { UpdateRefundPolicyDto } from './dto/update-refund-policy.dto';

const refundPolicy = plainToClass(RefundPolicy, refundPolicyJSON);
const options = {
  keys: ['title'],
  threshold: 0.3,
};
const fuse = new Fuse(refundPolicy, options);

@Injectable()
export class RefundPoliciesService {
  private refundPolicy: RefundPolicy[] = refundPolicy;

  create(createRefundPolicyDto: CreateRefundPolicyDto) {
    return this.refundPolicy[0];
  }

  findAllRefundPolicies({ search, limit, page }: GetRefundPolicyDto) {
    if (!page) page = 1;
    if (!limit) limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: RefundPolicy[] = this.refundPolicy;

    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }

    let results = data.slice(startIndex, endIndex);
    if (results.length == 0) {
      results = this.refundPolicy.slice(0, limit);
    }
    const url = `/refund-policies?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getRefundPolicy(param: string, language: string) {
    return this.refundPolicy.find((p) => p.slug === param);
  }

  update(id: number, updateRefundDto: UpdateRefundPolicyDto) {
    return this.refundPolicy[0];
  }

  remove(id: number) {
    return `This action removes a #${id} refund policy`;
  }
}
