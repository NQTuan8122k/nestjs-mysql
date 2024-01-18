import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async create(productData): Promise<Product> {
    const product = new Product(productData);
    return await product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ where: { id } });
  }

  async update(id: number, productData): Promise<[number, Product[]]> {
    const [affectedCount, affectedRows] = await this.productModel.update(
      productData,
      {
        where: { id },
        returning: true,
      },
    );
    return [affectedCount, affectedRows as Product[]];
  }

  async remove(id: number): Promise<number> {
    return this.productModel.destroy({ where: { id } });
  }
}
