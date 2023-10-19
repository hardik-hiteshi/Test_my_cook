import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiscountDTO } from './dto/createDto/discount.create.dto';
import { DiscountDocument } from './schema/discount.schema';
import { DiscountRepository } from './repository/discount.repository';
import { UpdateDiscountDTO } from './dto/updateDto/discount.update.dto';

@Injectable()
export class DiscountService {
  public constructor(public discountRepo: DiscountRepository) {}

  public async createDiscount(
    body: CreateDiscountDTO,
  ): Promise<DiscountDocument> {
    const discount = await this.discountRepo.createDiscount(body);

    return discount;
  }

  public async fetchDiscount(uniqueId: string): Promise<DiscountDocument> {
    const discount = await this.discountRepo.fetchDiscount(uniqueId);
    if (!discount) {
      throw new NotFoundException('Discount not found.');
    }

    return discount;
  }

  public async updateDiscount(
    uniqueId: string,
    body: UpdateDiscountDTO,
  ): Promise<DiscountDocument> {
    const updatedDiscount = await this.discountRepo.updateDiscount(
      uniqueId,
      body,
    );
    if (!updatedDiscount) {
      throw new NotFoundException('Discount Not found.');
    }

    return updatedDiscount;
  }

  public async deleteDiscount(uniqueId: string): Promise<object> {
    const deletedDiscount = await this.discountRepo.deleteDiscount(uniqueId);
    if (!deletedDiscount) {
      throw new NotFoundException('Discount Not found.');
    }

    return { message: 'Delete Sucess' };
  }

  public async fetchDiscounts(search?: string): Promise<DiscountDocument[]> {
    const discountsList = await this.discountRepo.fetchDiscounts(search);
    if (discountsList.length > 0) {
      return discountsList;
    }

    return [];
    // throw new NotFoundException('Discounts not found.');
  }
}
