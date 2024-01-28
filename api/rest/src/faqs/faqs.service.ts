import { Injectable } from '@nestjs/common';
import { GetFaqsDto } from './dto/get-faqs.dto';
import faqsJSON from '@db/faqs.json';
import { Faq } from './entities/faq.entity';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

const faqs = plainToClass(Faq, faqsJSON);
const options = {
  keys: ['faq_title'],
  threshold: 0.3,
};
const fuse = new Fuse(faqs, options);

@Injectable()
export class FaqsService {
  private faqs: Faq[] = faqs;

  create(createFaqDto: CreateFaqDto) {
    return this.faqs[0];
  }

  findAllFaqs({ search, limit, page, shop_id }: GetFaqsDto) {
    if (!page) page = 1;
    if (!limit) limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Faq[] = this.faqs;

    if (shop_id) {
      data = this.faqs.filter((p) => Number(p.shop_id) === Number(shop_id));
    }

    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }

    let results = data.slice(startIndex, endIndex);
    if (results.length == 0) {
      results = this.faqs.slice(0, limit);
    }
    const url = `/faqs?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getFaq(param: string, language: string) {
    return this.faqs.find((p) => p.id === Number(param));
  }

  update(id: number, updateFaqDto: UpdateFaqDto) {
    return this.faqs[0];
  }

  remove(id: number) {
    return `This action removes a #${id} faq`;
  }
}
