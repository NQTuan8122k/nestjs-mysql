import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() productData): Promise<Product> {
    return this.productsService.create(productData);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() productData,
  ): Promise<[number, Product[]]> {
    return this.productsService.update(Number(id), productData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.productsService.remove(Number(id));
  }
}
