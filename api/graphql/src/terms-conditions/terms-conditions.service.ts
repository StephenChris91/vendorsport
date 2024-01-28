import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { CreateTermsConditionsInput } from './dto/create-terms-conditions.input';
import { GetTermsConditionsArgs } from './dto/get-terms-conditions.args';
import { GetTermsConditionArgs } from './dto/get-terms-condition.args';
import { UpdateTermsConditionsInput } from './dto/update-terms-conditions.input';
import { TermsAndConditions } from './entities/terms-conditions.entity';
import termsAndConditionJson from './terms-conditions.json';

const termsAndConditions = plainToClass(
  TermsAndConditions,
  termsAndConditionJson,
);
const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(termsAndConditions, options);

@Injectable()
export class TermsAndConditionService {
  private termsAndConditions: TermsAndConditions[] = termsAndConditions;

  create({ ...createTermsConditionsInput }: CreateTermsConditionsInput) {
    const newTermsAndConditions = {
      id: this.termsAndConditions.length + 1,
      ...createTermsConditionsInput,
      created_at: new Date(),
      updated_at: new Date(),
    };
    // TODO: Fix it
    // @ts-ignore
    this.termsAndConditions.push(newTermsAndConditions);
    return newTermsAndConditions;
  }

  findAll({ search, first, page, sortedBy }: GetTermsConditionsArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: TermsAndConditions[] = this.termsAndConditions;

    if (search?.slice(6, search.length).length > 0) {
      const formatText = search?.replace(/%/g, '').slice(6, search.length);
      data = fuse.search(formatText)?.map(({ item }) => item);
    }
    data.sort(() => (sortedBy === 'ASC' ? 1 : -1));

    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(
        this.termsAndConditions.length,
        page,
        first,
        this.termsAndConditions.length,
      ),
    };
  }

  findOne(getTermsConditionArgs: GetTermsConditionArgs) {
    return this.termsAndConditions.find(
      (termsAndCondition) =>
        termsAndCondition.id === Number(getTermsConditionArgs.id) ||
        getTermsConditionArgs.slug === getTermsConditionArgs.slug,
    );
  }

  update(id: number, updateTermsConditionsInput: UpdateTermsConditionsInput) {
    return this.termsAndConditions[0];
  }

  remove(id: number) {
    return this.termsAndConditions[0];
  }
  approve(id: number) {
    return this.termsAndConditions[0];
  }
  disApprove(id: number) {
    return this.termsAndConditions[0];
  }
}
