import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { RecipeRepository } from './repository/recipe.repository';
import { Request } from 'express';

@Injectable()
export class RecipeService {
  constructor(private recipeRepo: RecipeRepository) {}
  async createRecipe(region, body) {
    const recipe = await this.recipeRepo.findOne(region, body);
    if (!recipe) {
      const recipe = await this.recipeRepo.create(body);
      return recipe;
    }
    if (recipe) throw new BadRequestException('Recipe already exists.');
  }

  async fetchAllRecipes(region, search) {
    const RecipeList = await this.recipeRepo.findAll(region, search);
    if (RecipeList.length <= 0) throw new NotFoundException('No recipe found');
    return RecipeList;
  }

  async fetchRecipe(region, niceName) {
    const recipe = await this.recipeRepo.fetchOne(region, niceName);
    return recipe;
  }
}
