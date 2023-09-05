import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/createRecipe/createRecipe.dto';
import { RecipeDocument } from './schema/subSchema';
import { RecipeRepository } from './repository/recipe.repository';
import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';
// import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';

@Injectable()
export class RecipeService {
  public constructor(private recipeRepo: RecipeRepository) {}

  public async createRecipe(
    region: string,
    body: CreateRecipeDto,
  ): Promise<RecipeDocument> {
    const recipe = await this.recipeRepo.findOne(region, body);
    if (!recipe) {
      const recipe = await this.recipeRepo.createRecipe(region, body);

      return recipe;
    }
    if (recipe) throw new BadRequestException('Recipe already exists.');
  }

  public async fetchAllRecipes(
    region: string,
    search: string,
  ): Promise<Array<RecipeDocument>> {
    const recipeList = await this.recipeRepo.fetchRecipes(region, search);
    if (recipeList.length <= 0) throw new NotFoundException('No recipe found');
    else {
      return recipeList;
    }
  }

  public async fetchRecipe(
    region: string,
    niceName: string,
  ): Promise<RecipeDocument> {
    const recipe = await this.recipeRepo.fetchOne(region, niceName);
    if (!recipe) {
      throw new NotFoundException('Recipe Does not exist.');
    }

    return recipe;
  }

  public async updateRecipe(
    region: string,
    body: UpdateRecipeDto,
    niceName: string,
  ): Promise<RecipeDocument> {
    const recipe = await this.recipeRepo.updateRecipe(region, body, niceName);
    if (!recipe) {
      throw new NotFoundException('Recipe Does not exist.');
    }

    return recipe;
  }

  public async deleteRecipe(
    region: string,
    niceName: string,
  ): Promise<RecipeDocument> {
    const recipe = await this.recipeRepo.deleteRecipe(region, niceName);
    if (recipe == null) {
      throw new NotFoundException('Recipe Does not exist.');
    }

    return recipe;
  }
}
