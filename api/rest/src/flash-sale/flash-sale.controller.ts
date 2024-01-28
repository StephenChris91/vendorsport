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
import { FlashSaleService } from './flash-sale.service';
import { GetFlashSaleDto } from './dto/get-flash-sales.dto';
import { CreateFlashSaleDto } from './dto/create-flash-sale.dto';
import { UpdateFlashSaleDto } from './dto/update-flash-sale.dto';

@Controller('flash-sale')
export class FlashSaleController {
  constructor(private flashSaleService: FlashSaleService) {}

  @Post()
  createFlashSale(@Body() createFlashSaleDto: CreateFlashSaleDto) {
    return this.flashSaleService.create(createFlashSaleDto);
  }

  @Get()
  findAll(@Query() query: GetFlashSaleDto) {
    return this.flashSaleService.findAllFlashSale(query);
  }

  @Get(':param')
  getFlashSale(
    @Param('param') param: string,
    @Query('language') language: string,
  ) {
    return this.flashSaleService.getFlashSale(param, language);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Param('language') language: string,
    @Body() updateFlashSaleDto: UpdateFlashSaleDto,
  ) {
    return this.flashSaleService.update(+id, updateFlashSaleDto);
  }

  @Delete(':id')
  deleteFlashSale(@Param('id') id: string) {
    return this.flashSaleService.remove(+id);
  }
}

@Controller('products-by-flash-sale')
export class ProductsByFlashSaleController {
  constructor(private flashSaleService: FlashSaleService) {}

  @Get()
  findAll(@Query() query: GetFlashSaleDto) {
    return this.flashSaleService.findAllProductsByFlashSale(query);
  }
}
