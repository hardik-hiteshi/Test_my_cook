import { Discount, DiscountDocument } from '../schema/discount.schema';
import { CreateDiscountDTO } from '../dto/createDto/discount.create.dto';
import { DiscountQueryInterface } from './discount.query.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateDiscountDTO } from '../dto/updateDto/discount.update.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DiscountRepository {
  public constructor(
    @InjectModel(Discount.name)
    public discountModel: Model<DiscountDocument>,
  ) {}

  public async createDiscount(
    body: CreateDiscountDTO,
  ): Promise<DiscountDocument> {
    const discount = await this.discountModel.create({
      ...body,
      uniqueId: uuid(),
    });

    return discount;
  }

  public async fetchDiscount(uniqueId: string): Promise<DiscountDocument> {
    const discount = await this.discountModel.findOne({
      uniqueId,
      isActive: true,
    });

    return discount;
  }

  public async updateDiscount(
    uniqueId: string,
    body: UpdateDiscountDTO,
  ): Promise<DiscountDocument> {
    const updatedDiscount = await this.discountModel.findOneAndUpdate(
      { uniqueId, isActive: true },
      body,
      { new: true },
    );

    return updatedDiscount;
  }

  public async deleteDiscount(uniqueId: string): Promise<DiscountDocument> {
    const deletedDiscount = await this.discountModel.findOneAndUpdate(
      { uniqueId, isActive: true },
      { isActive: false },
      { new: true },
    );

    return deletedDiscount;
  }

  public async fetchDiscounts(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<DiscountDocument[]> {
    const query: DiscountQueryInterface = {};
    const skipAmount = (pageNumber - 1) * pageSize;
    if (search) {
      query.$or = [
        { type: { $regex: search.toString(), $options: 'i' } },
        { codes: { $regex: search.toString(), $options: 'i' } },
        { message: { $regex: search.toString(), $options: 'i' } },
        { detail: { $regex: search.toString(), $options: 'i' } },
        { desc: { $regex: search.toString(), $options: 'i' } },
        { creator: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const discounts = await this.discountModel
      .find({
        $and: [query, { isActive: true }],
      })
      .skip(skipAmount)
      .limit(pageSize);

    return discounts;
  }
}
