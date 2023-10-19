import {
  AffiliateConfig,
  AffiliateConfigDocument,
} from '../schema/affiliateConfig.schema';
import { AffiliateConfigQueryInterface } from './affiliateConfig.query.interface';
import { CreateAffiliateConfigDTO } from '../dto/createDto/createAffiliateConfig.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAffiliateConfigDTO } from '../dto/updateDto/updateAffiliateConfig.dto';

@Injectable()
export class AffiliateConfigRepository {
  public constructor(
    @InjectModel(AffiliateConfig.name)
    public affiliateConfigModel: Model<AffiliateConfigDocument>,
  ) {}

  public async findOne(
    body: CreateAffiliateConfigDTO,
  ): Promise<AffiliateConfigDocument> {
    const existingAffiliateConfig = await this.affiliateConfigModel.findOne({
      cookieName: body.cookieName,
      isActive: true,
    });

    return existingAffiliateConfig;
  }

  public async createAffiliateConfig(
    body: CreateAffiliateConfigDTO,
  ): Promise<AffiliateConfigDocument> {
    const affiliateConfig = await this.affiliateConfigModel.create({ ...body });

    return affiliateConfig;
  }

  public async fetchOne(cookieName: string): Promise<AffiliateConfigDocument> {
    const affiliateConfig = await this.affiliateConfigModel.findOne({
      cookieName,
      isActive: true,
    });

    return affiliateConfig;
  }

  public async updateAffiliateConfig(
    cookieName: string,
    body: UpdateAffiliateConfigDTO,
  ): Promise<AffiliateConfigDocument> {
    const updatedAffiliateConfig =
      await this.affiliateConfigModel.findOneAndUpdate(
        { cookieName, isActive: true },
        body,
        { new: true },
      );

    return updatedAffiliateConfig;
  }

  public async deleteAffiliateConfig(
    cookieName: string,
  ): Promise<AffiliateConfigDocument> {
    const deletedAffiliateConfig =
      await this.affiliateConfigModel.findOneAndUpdate(
        { cookieName, isActive: true },
        { isActive: false },
        { new: true },
      );

    return deletedAffiliateConfig;
  }

  public async fetchAffiliateConfigs(
    search?: string,
  ): Promise<AffiliateConfigDocument[]> {
    const query: AffiliateConfigQueryInterface = {
      isActive: true,
    };
    if (search) {
      query.$or = [
        { cookieName: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const affiliateConfigs = await this.affiliateConfigModel.find({
      $and: [query, { isActive: true }],
    });

    return affiliateConfigs;
  }
}
