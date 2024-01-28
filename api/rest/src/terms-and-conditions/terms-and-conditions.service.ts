import { Injectable } from '@nestjs/common';
import termsAndConditionsJSON from '@db/terms-and-conditions.json';
import { TermsAndConditions } from './entities/terms-and-conditions.entity';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { GetTermsAndConditionsDto } from './dto/get-terms-and-conditions.dto';
import { CreateTermsAndConditionsDto } from './dto/create-terms-and-conditions.dto';
import { UpdateTermsAndConditionsDto } from './dto/update-terms-and-conditions.dto';

const termsAndConditions = plainToClass(
  TermsAndConditions,
  termsAndConditionsJSON,
);
const options = {
  keys: ['title'],
  threshold: 0.3,
};
const fuse = new Fuse(termsAndConditions, options);

@Injectable()
export class TermsAndConditionsService {
  private termsAndConditions: TermsAndConditions[] = termsAndConditions;

  create(createTermsAndConditionsDto: CreateTermsAndConditionsDto) {
    return this.termsAndConditions[0];
  }

  findAllTermsAndConditions({
    search,
    limit,
    page,
    is_approved,
  }: GetTermsAndConditionsDto) {
    if (!page) page = 1;
    if (!limit) limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: TermsAndConditions[] = this.termsAndConditions;

    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }

    let results = data.slice(startIndex, endIndex);
    if (results.length == 0) {
      results = this.termsAndConditions.slice(0, limit);
    }
    const url = `/terms-and-conditions?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  findOne(param: string, language: string) {
    return this.termsAndConditions.find((p) => p.slug === String(param));
  }

  update(id: number, updateTermsAndConditionsDto: UpdateTermsAndConditionsDto) {
    return this.termsAndConditions[0];
  }

  remove(id: number) {
    return `This action removes a #${id} terms and conditions`;
  }

  disapproveTermsAndCondition(id: number) {
    const termsAndCondition = this.termsAndConditions.find(
      (s) => s.id === Number(id),
    );
    termsAndCondition.is_approved = false;

    return termsAndCondition;
  }

  approveTermsAndCondition(id: number) {
    const termsAndCondition = this.termsAndConditions.find(
      (s) => s.id === Number(id),
    );
    termsAndCondition.is_approved = true;

    return termsAndCondition;
  }
}
