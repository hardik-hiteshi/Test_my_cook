import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { RecipeRepository } from './repository/recipe.repository';
import { RecipeDocument } from './schema/recipe.schema';
import { CreateRecipeDto } from './dto/createRecipe/createRecipe.dto';
import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';

@Injectable()
export class RecipeService {
  constructor(private recipeRepo: RecipeRepository) {}

  async createRecipe(region: string, body: CreateRecipeDto) {
    const recipe = await this.recipeRepo.findOne(region, body);
    if (!recipe) {
      const recipe = await this.recipeRepo.create(body);
      return recipe;
    }
    if (recipe) throw new BadRequestException('Recipe already exists.');
  }

  async fetchAllRecipes(region: string, search: string) {
    const RecipeList = await this.recipeRepo.findAll(region, search);
    if (RecipeList.length <= 0) throw new NotFoundException('No recipe found');
    return RecipeList;
  }

  async fetchRecipe(region, niceName) {
    const recipe = await this.recipeRepo.fetchOne(region, niceName);
    if (!recipe) {
      throw new NotFoundException('Recipe Does not exist.');
    }
    return recipe;
  }

  async updateRecipe(
    body: UpdateRecipeDto,
    niceName: string,
  ): Promise<RecipeDocument> {
    return await this.recipeRepo.updateOne(body, niceName);
  }
}
