import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { CreateRefundPolicyInput } from './dto/create-refund-policies.input';
import { GetRefundPoliciesArgs } from './dto/get-refund-policies.args';
import { GetRefundPolicyArgs } from './dto/get-refund-policy.args';
import { UpdateRefundPolicyInput } from './dto/update-refund-policies.input';
import { RefundPolicy } from './entities/refund-policies.entity';
import refundPoliciesJson from './refund-policies.json';

const refundPolicies = plainToClass(RefundPolicy, refundPoliciesJson);
const options = {
  keys: ['title'],
  threshold: 0.3,
};
const fuse = new Fuse(refundPolicies, options);

@Injectable()
export class RefundPoliciesService {
  private refundPolicies: RefundPolicy[] = refundPolicies;

  create(createRefundPolicyInput: CreateRefundPolicyInput) {
    return this.refundPolicies[0];
  }

  findAll({ first, page, search, sortedBy }: GetRefundPoliciesArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: RefundPolicy[] = this.refundPolicies;

    if (search?.slice(6, search.length).length > 0) {
      const formatText = search?.replace(/%/g, '').slice(6, search.length);
      data = fuse.search(formatText)?.map(({ item }) => item);
    }
    data.sort(() => (sortedBy === 'ASC' ? 1 : -1));

    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(
        this.refundPolicies.length,
        page,
        first,
        this.refundPolicies.length,
      ),
    };
  }

  findOne({ id, slug }: GetRefundPolicyArgs) {
    if (id) {
      return this.refundPolicies.find((p) => p.id === Number(id));
    }
    return this.refundPolicies.find((p) => p.slug === slug);
  }

  update(id: number, updateRefundPoliciesInput: UpdateRefundPolicyInput) {
    return this.refundPolicies[0];
  }

  remove(id: number) {
    return this.refundPolicies[0];
  }
}
