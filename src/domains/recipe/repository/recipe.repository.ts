import { InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from '../schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipeRepository {
  constructor(@InjectModel(Recipe.name) private RecipeModel: Model<Recipe>) {}

  async findOne(body) {
    return await this.RecipeModel.findOne({ niceName: body.niceName });
  }
  async create(body) {
    return await this.RecipeModel.create(body);
  }
}
