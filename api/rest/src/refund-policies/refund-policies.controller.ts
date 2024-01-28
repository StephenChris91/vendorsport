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
import { RefundPoliciesService } from './refund-policies.service';
import { CreateRefundPolicyDto } from './dto/create-refund-policy.dto';
import { GetRefundPolicyDto } from './dto/get-refund-policies.dto';
import { UpdateRefundPolicyDto } from './dto/update-refund-policy.dto';

@Controller('refund-policies')
export class RefundPoliciesController {
  constructor(private refundPoliciesService: RefundPoliciesService) {}

  @Post()
  createRefund(@Body() createRefundPolicyDto: CreateRefundPolicyDto) {
    return this.refundPoliciesService.create(createRefundPolicyDto);
  }

  @Get()
  findAll(@Query() query: GetRefundPolicyDto) {
    return this.refundPoliciesService.findAllRefundPolicies(query);
  }

  @Get(':param')
  getRefund(
    @Param('param') param: string,
    @Query('language') language: string,
  ) {
    return this.refundPoliciesService.getRefundPolicy(param, language);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Param('language') language: string,
    @Body() updateRefundDto: UpdateRefundPolicyDto,
  ) {
    return this.refundPoliciesService.update(+id, updateRefundDto);
  }

  @Delete(':id')
  deleteRefund(@Param('id') id: string) {
    return this.refundPoliciesService.remove(+id);
  }
}
