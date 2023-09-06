import { FoodGroup, FoodGroupDocument } from '../schema/food-group.schema';
import { CreateFoodGroupDto } from '../dtos/createFoodGroup/createFoodGroup.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateFoodGroupDto } from '../dtos/updateFoodGroup/updateFoodGroup.dto';

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

  public async findAll(region: string): Promise<FoodGroupDocument[]> {
    return await this.foodGroupModel.find({ region, isActive: true });
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
      { niceName, region, isActive: true },
      { isActive: false },
      { new: true },
    );
  }
}
