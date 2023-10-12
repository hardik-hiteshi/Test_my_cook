/* eslint-disable @typescript-eslint/naming-convention */
import {
  ReturnedProducts,
  ReturnedProductsDocument,
} from '../schema/returned-products.schema';
import { CreateReturnedProductsDTO } from '../dto/createDto/returned-products.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';
import { ReturnedProductsQueryInterface } from './returned-products.query.interface';
import { UpdateReturnedProductsDTO } from '../dto/updateDto/returned-products.update.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ReturnedProductsRepository {
  public constructor(
    @InjectModel(ReturnedProducts.name)
    public returnedProductsModel: Model<ReturnedProductsDocument>,
  ) {}

  public async createReturnedProduct(
    body: CreateReturnedProductsDTO,
  ): Promise<ReturnedProductsDocument> {
    const returnedProducts = await this.returnedProductsModel.create({
      ...body,
      uniqueId: uuid(),
    });

    return returnedProducts;
  }

  public async fetchReturnedProduct(
    uniqueId: string,
  ): Promise<ReturnedProductsDocument> {
    const returnedProducts = await this.returnedProductsModel.findOne({
      uniqueId,
      isActive: true,
    });

    return returnedProducts;
  }

  public async updateReturnedProduct(
    uniqueId: string,
    body: UpdateReturnedProductsDTO,
  ): Promise<ReturnedProductsDocument> {
    const updatedReturnedProducts =
      await this.returnedProductsModel.findOneAndUpdate(
        { uniqueId, isActive: true },
        body,
        { new: true },
      );

    return updatedReturnedProducts;
  }

  public async deleteReturnedProduct(
    uniqueId: string,
  ): Promise<ReturnedProductsDocument> {
    const deletedReturnedProducts =
      await this.returnedProductsModel.findOneAndUpdate(
        { uniqueId, isActive: true },
        { isActive: false },
        { new: true },
      );

    return deletedReturnedProducts;
  }

  public async fetchReturnedProducts(
    search?: string,
  ): Promise<ReturnedProductsDocument[]> {
    const query: ReturnedProductsQueryInterface = {};
    if (search) {
      query.$or = [
        { id: { $regex: search.toString(), $options: 'i' } },
        { state: { $regex: search.toString(), $options: 'i' } },
        { 'customerValue.email': { $regex: search.toString(), $options: 'i' } },
        { 'customerValue.name': { $regex: search.toString(), $options: 'i' } },
        {
          'customerValue.lastName': {
            $regex: search.toString(),
            $options: 'i',
          },
        },
        { date: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const returnedProducts = await this.returnedProductsModel.find({
      $and: [query, { isActive: true }],
    });

    return returnedProducts;
  }

  public async findAll(
    query: RecursivePartial<ReturnedProducts> | object,
  ): Promise<ReturnedProductsDocument[]> {
    return await this.returnedProductsModel.find(query).lean();
  }
}
