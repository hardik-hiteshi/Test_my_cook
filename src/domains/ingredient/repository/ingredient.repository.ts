import { CreateIngredientDto, UpdateIngredientDto } from '../dtos';
import { Ingredient, IngredientDocument } from '../schema/ingredient.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class IngredientRepository {
  public constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
  ) {}

  public async createOne(
    body: CreateIngredientDto,
    region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientModel.create({ ...body, region });
  }
  public async updateOne(
    body: UpdateIngredientDto,
    niceName: string,
    region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientModel.findOneAndUpdate(
      { niceName, region, isActive: true },
      body,
      { new: true },
    );
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientModel.findOne({
      niceName,
      region,
      isActive: true,
    });
    //.populate('foodGroup');
  }

  public async findAll(region: string): Promise<IngredientDocument[]> {
    return await this.ingredientModel
      .find({ region, isActive: true })
      .populate('foodGroup');
  }

  public async deleteOne(
    niceName: string,
    region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientModel.findOneAndUpdate(
      { niceName, region, isActive: true },
      { isActive: false },
      { new: true },
    );
  }
}
