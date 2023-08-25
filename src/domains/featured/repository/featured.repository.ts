import { Featured, FeaturedDocument } from '../schema/featured.schema';
import { CreateFeatureDTO } from '../dto/createfeatured.dto';
import { FeaturedQueryInterface } from './featuredquery.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateFeatureDTO } from '../dto/updatefeatured.dto';

export class FeaturedRepository {
  public constructor(
    @InjectModel(Featured.name) public featuredModel: Model<Featured>,
  ) {}

  public async findOne(
    region: string,
    body: CreateFeatureDTO,
  ): Promise<FeaturedDocument> {
    const existingFeatured = await this.featuredModel.findOne({
      region,
      ...body,
      isActive: true,
    });

    return existingFeatured;
  }

  public async create(
    region: string,
    body: CreateFeatureDTO,
  ): Promise<FeaturedDocument> {
    const featured = await this.featuredModel.create({ ...body, region });

    return featured;
  }

  public async fetchFeatured(
    region: string,
    type: string,
    search?: string,
  ): Promise<FeaturedDocument> {
    const query: FeaturedQueryInterface = {
      region,
      type,
      isActive: true,
    };
    if (search) {
      query.$or = [{ featuredList: { $regex: search, $options: 'i' } }];
    }
    const featured = await this.featuredModel.findOne({
      ...query,
      isActive: true,
    });

    return featured;
  }

  public async updateFeatured(
    region: string,
    body: UpdateFeatureDTO,
  ): Promise<FeaturedDocument> {
    const { type, featuredList } = body;
    const updateData: Partial<UpdateFeatureDTO> = {
      type,
    };

    if (featuredList) {
      updateData.featuredList = featuredList;
    }

    const options = {
      new: true,
      upsert: true,
    };
    const data = await this.featuredModel.findOneAndUpdate(
      { region, type, isActive: true },
      updateData,
      options,
    );

    if (data) {
      return data;
    }
  }

  public async deleteFeatured(
    region: string,
    type: string,
  ): Promise<FeaturedDocument> {
    return await this.featuredModel.findOneAndUpdate(
      { type, region, isActive: true },
      { isActive: false },
      { new: true },
    );
  }
}
