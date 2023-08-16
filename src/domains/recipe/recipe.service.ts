import { BadRequestException, Injectable } from '@nestjs/common';
import { RecipeRepository } from './repository/recipe.repository';

@Injectable()
export class RecipeService {
  constructor(private recipeRepo: RecipeRepository) {}
  async createRecipe(body) {
    const recipe = await this.recipeRepo.findOne(body);
    if (!recipe) {
      const recipe = await this.recipeRepo.create(body);
      return recipe;
    }
    if (recipe) throw new BadRequestException('Recipe already exists.');
  }
}
