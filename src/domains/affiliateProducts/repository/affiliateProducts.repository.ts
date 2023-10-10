import {
  AffiliateProduct,
  AffiliateProductDocument,
} from '../schema/affiliateProducts.schema';
import { AffiliateProductQueryInterface } from './affiliateProducts.query.interface';
import { CreateAffiliateProductDTO } from '../dto/createDto/createAffiliateProducts.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAffiliateProductDTO } from '../dto/updateDto/updateAffiliateProducts.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AffiliateProductRepository {
  public constructor(
    @InjectModel(AffiliateProduct.name)
    public affiliateProductModel: Model<AffiliateProductDocument>,
  ) {}

  public async createAffiliateProduct(
    body: CreateAffiliateProductDTO,
  ): Promise<AffiliateProductDocument> {
    const affiliateProduct = await this.affiliateProductModel.create({
      ...body,
      uniqueId: uuid(),
    });

    const affiliateProductData = await this.affiliateProductModel
      .findOne({ uniqueId: affiliateProduct.uniqueId })
      .populate('affiliateProduct', 'niceName');

    return affiliateProductData;
  }

  public async fetchOne(uniqueId: string): Promise<AffiliateProductDocument> {
    const affiliateProduct = await this.affiliateProductModel
      .findOne({
        uniqueId,
        isActive: true,
      })
      .populate('affiliateProduct', 'niceName');

    return affiliateProduct;
  }

  public async updateAffiliateProduct(
    uniqueId: string,
    body: UpdateAffiliateProductDTO,
  ): Promise<AffiliateProductDocument> {
    const updatedAffiliateProduct = await this.affiliateProductModel
      .findOneAndUpdate({ uniqueId, isActive: true }, body, { new: true })
      .populate('affiliateProduct', 'niceName');

    return updatedAffiliateProduct;
  }

  public async deleteAffiliateProduct(
    uniqueId: string,
  ): Promise<AffiliateProductDocument> {
    const deletedAffiliateProduct =
      await this.affiliateProductModel.findOneAndUpdate(
        { uniqueId, isActive: true },
        { isActive: false },
        { new: true },
      );

    return deletedAffiliateProduct;
  }

  public async fetchAffiliateProducts(
    search?: string,
  ): Promise<AffiliateProductDocument[]> {
    const query: AffiliateProductQueryInterface = {
      isActive: true,
    };
    if (search) {
      query.$or = [{ uniqueId: { $regex: search.toString(), $options: 'i' } }];
    }

    const affiliateProducts = await this.affiliateProductModel
      .find({
        $and: [query, { isActive: true }],
      })
      .populate('affiliateProduct', 'niceName');

    return affiliateProducts;
  }

  // public async findOne(
  //   body: CreateAffiliateProductDTO,
  // ): Promise<AffiliateProductDocument> {
  //   const existingAffiliateProduct = await this.affiliateProductModel.findOne({
  //     uniqueId: body.uniqueId,
  //     isActive: true,
  //   });

  //   return existingAffiliateProduct;
  // }
}
