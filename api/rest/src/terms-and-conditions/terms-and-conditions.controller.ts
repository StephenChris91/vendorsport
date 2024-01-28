import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TermsAndConditionsService } from './terms-and-conditions.service';
import { GetTermsAndConditionsDto } from './dto/get-terms-and-conditions.dto';
import { CreateTermsAndConditionsDto } from './dto/create-terms-and-conditions.dto';
import { UpdateTermsAndConditionsDto } from './dto/update-terms-and-conditions.dto';

@Controller('terms-and-conditions')
export class TermsAndConditionsController {
  constructor(private termsAndConditionsService: TermsAndConditionsService) {}

  @Post()
  createTermsAndConditions(
    @Body() createTermsAndConditionsDto: CreateTermsAndConditionsDto,
  ) {
    return this.termsAndConditionsService.create(createTermsAndConditionsDto);
  }

  @Get()
  getTermsAndConditions(@Query() query: GetTermsAndConditionsDto) {
    return this.termsAndConditionsService.findAllTermsAndConditions(query);
  }

  @Get(':param')
  findOne(@Param('param') param: string, @Query('language') language: string) {
    return this.termsAndConditionsService.findOne(param, language);
  }

  @Put(':id')
  updateTermsConditions(
    @Param('id') id: string,
    @Param('language') language: string,
    @Body() updateTermsAndConditionsDto: UpdateTermsAndConditionsDto,
  ) {
    return this.termsAndConditionsService.update(
      +id,
      updateTermsAndConditionsDto,
    );
  }

  @Delete(':id')
  deleteTermsAndConditions(@Param('id') id: string) {
    return this.termsAndConditionsService.remove(+id);
  }
}

@Controller('disapprove-terms-and-conditions')
export class DisapproveTermsAndConditionController {
  constructor(private termsAndConditionsService: TermsAndConditionsService) {}

  @Post()
  async disapproveTermsAndCondition(@Body('id') id) {
    return this.termsAndConditionsService.disapproveTermsAndCondition(id);
  }
}

@Controller('approve-terms-and-conditions')
export class ApproveTermsAndConditionController {
  constructor(private termsAndConditionsService: TermsAndConditionsService) {}

  @Post()
  async approveTermsAndCondition(@Body('id') id) {
    return this.termsAndConditionsService.approveTermsAndCondition(id);
  }
}
