import { CreateFoodGroupDto, UpdateFoodGroupDto } from '../dtos';
import { FoodGroup, FoodGroupDocument } from '../schema/food-group.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

@Injectable()
export class FoodGroupRepository {
  public constructor(
    @InjectModel(FoodGroup.name) private foodGroupModel: Model<FoodGroup>,
  ) {}

  public async createOne(
    body: CreateFoodGroupDto,
    region: string,
  ): Promise<FoodGroupDocument> {
    return await this.foodGroupModel.create({ ...body, region });
  }

  public async findOne(
    region: string,
    niceName: string,
  ): Promise<FoodGroupDocument> {
    return await this.foodGroupModel.findOne({
      niceName,
      region,
      isActive: true,
    });
  }

  public async findAllByRegion(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<FoodGroupDocument[]> {
    const skipAmount = (pageNumber - 1) * pageSize;

    return await this.foodGroupModel
      .find({ region, isActive: true })
      .skip(skipAmount)
      .limit(pageSize);
  }
  public async findAll(
    query: RecursivePartial<FoodGroup> | object,
  ): Promise<FoodGroupDocument[]> {
    return await this.foodGroupModel.find(query);
  }
  public async updateOne(
    region: string,
    niceName: string,
    body: UpdateFoodGroupDto,
  ): Promise<FoodGroupDocument> {
    return await this.foodGroupModel.findOneAndUpdate(
      { niceName, region, isActive: true },
      body,
      { new: true },
    );
  }

  public async deleteOne(
    region: string,
    niceName: string,
  ): Promise<FoodGroupDocument> {
    return await this.foodGroupModel.findOneAndUpdate(
      { niceName, region },
      { isActive: false },
      { new: true },
    );
  }

  public async createMany(
    data: CreateFoodGroupDto[],
  ): Promise<FoodGroupDocument[]> {
    return (await this.foodGroupModel.insertMany(data)) as FoodGroupDocument[];
  }
  public async findDistinctNiceName(region: string): Promise<string[]> {
    return await this.foodGroupModel.distinct('niceName', { region }).lean();
  }
}
