import { CreateProductDto, UpdateProductDto } from '../dtos';
import { Product, ProductDocument } from '../schema/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

@Injectable()
export class ProductRepository {
  public constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  public async createOne(body: CreateProductDto): Promise<ProductDocument> {
    return await this.productModel.create(body);
  }
  public async findOneForCreate(
    body: CreateProductDto,
  ): Promise<ProductDocument> {
    return this.productModel.findOne({
      $or: [
        { niceName: body.niceName, isDeleted: false },
        { cms: { url: { slug: body.cms.url.slug } }, isDeleted: false },
      ],
    });
  }
  public async findOne(
    query: RecursivePartial<Product> | object,
  ): Promise<ProductDocument> {
    return await this.productModel.findOne(query);
  }

  public async findAll(): Promise<ProductDocument[]> {
    return await this.productModel.find({ isDeleted: false });
  }

  public async updateOne(
    niceName: string,
    body: UpdateProductDto,
  ): Promise<ProductDocument> {
    return await this.productModel.findOneAndUpdate(
      { niceName, isDeleted: false },
      body,
    );
  }
}
