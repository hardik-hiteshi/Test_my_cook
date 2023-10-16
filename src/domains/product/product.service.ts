import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { ProductDocument } from './schema/product.schema';
import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductService {
  public productNotFound = 'product not found';
  public productAlreadyExist = 'product already exist';
  public constructor(private productRepo: ProductRepository) {}

  public async createOne(body: CreateProductDto): Promise<ProductDocument> {
    const product = await this.productRepo.findOneForCreate(body);
    if (product) throw new BadRequestException(this.productAlreadyExist);

    return await this.productRepo.createOne(body);
  }
  public async findOne(niceName: string): Promise<ProductDocument> {
    const product = await this.productRepo.findOne({
      niceName,
    });

    if (!product) throw new NotFoundException(this.productNotFound);

    return product;
  }

  public async findAll(
    pageNumber: number,
    pageSize: number,
  ): Promise<ProductDocument[]> {
    const products = await this.productRepo.findAll(pageNumber, pageSize);
    if (products.length > 0) {
      return products;
    }
    throw new NotFoundException(this.productNotFound);

    return [];
  }

  public async deleteOne(niceName: string): Promise<object> {
    const product = await this.productRepo.deleteOne(niceName);

    if (!product) throw new NotFoundException(this.productNotFound);

    return { message: 'Deleted Success' };
  }

  public async updateOne(
    niceName: string,
    body: UpdateProductDto,
  ): Promise<ProductDocument> {
    const product = this.productRepo.updateOne(niceName, body);

    if (!product) throw new NotFoundException(this.productNotFound);

    return product;
  }
}
