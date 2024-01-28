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
import { RefundReasonsService } from './refund-reasons.service';
import { CreateRefundReasonDto } from './dto/create-refund-reasons.dto';
import { GetRefundReasonDto } from './dto/get-refund-reasons.dto';
import { UpdateRefundReasonDto } from './dto/update-refund-reasons.dto';

@Controller('refund-reasons')
export class RefundReasonsController {
  constructor(private refundReasonsService: RefundReasonsService) {}

  @Post()
  createRefund(@Body() createRefundReasonDto: CreateRefundReasonDto) {
    return this.refundReasonsService.create(createRefundReasonDto);
  }

  @Get()
  findAll(@Query() query: GetRefundReasonDto) {
    return this.refundReasonsService.findAllRefundPolicies(query);
  }

  @Get(':param')
  getRefund(
    @Param('param') param: string,
    @Query('language') language: string,
  ) {
    return this.refundReasonsService.getRefundPolicy(param, language);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Param('language') language: string,
    @Body() updateRefundReasonDto: UpdateRefundReasonDto,
  ) {
    return this.refundReasonsService.update(+id, updateRefundReasonDto);
  }

  @Delete(':id')
  deleteRefund(@Param('id') id: string) {
    return this.refundReasonsService.remove(+id);
  }
}
