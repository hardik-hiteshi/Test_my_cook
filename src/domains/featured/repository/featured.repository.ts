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

  public async create(body: CreateFeatureDTO): Promise<FeaturedDocument> {
    const featured = await this.featuredModel.create(body);

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
      const data = await this.featuredModel.findOne({ query });

      return data;
    }
    const data = await this.featuredModel.findOne(query);

    if (data) {
      return data;
    }
  }

  public async updateFeatured(
    region: string,
    body: UpdateFeatureDTO,
  ): Promise<FeaturedDocument> {
    const { type, featuredList } = body;
    const updateData: Partial<UpdateFeatureDTO> = {
      region,
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
      { region, type },
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
