import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlternativeRecipeDocument } from './schema/alternativeRecipe.schema';
import { AlternativeRecipeRepository } from './repository/alternative-recipe.repository';
import { CreateAlternativeRecipeDTO } from './dto/create alternative-recipe/createalternative-recipe.dto';
import { UpdateAlternativeRecipeDTO } from './dto/update alternative-recipe/updatealternative-recipe.dto';

@Injectable()
export class AlternativeRecipeService {
  public constructor(
    public alternativeRecipeRepo: AlternativeRecipeRepository,
  ) {}

  public async createRecipe(
    region: string,
    body: CreateAlternativeRecipeDTO,
  ): Promise<AlternativeRecipeDocument> {
    const recipe = await this.alternativeRecipeRepo.findOne(region, body);
    if (!recipe) {
      const recipe = await this.alternativeRecipeRepo.create(body);

      return recipe;
    }
    if (recipe) throw new BadRequestException('Recipe already exists.');
  }

  public async fetchAllRecipes(
    region: string,
    search: string,
  ): Promise<Array<AlternativeRecipeDocument>> {
    const recipeList = await this.alternativeRecipeRepo.findAll(region, search);
    if (recipeList.length <= 0) throw new NotFoundException('No recipe found');
    else {
      return recipeList;
    }
  }

  public async fetchRecipe(
    region,
    niceName,
  ): Promise<AlternativeRecipeDocument> {
    const recipe = await this.alternativeRecipeRepo.fetchOne(region, niceName);
    if (!recipe) {
      throw new NotFoundException('Recipe Does not exist.');
    }

    return recipe;
  }

  public async updateRecipe(
    body: UpdateAlternativeRecipeDTO,
    niceName: string,
  ): Promise<AlternativeRecipeDocument> {
    const recipe = await this.alternativeRecipeRepo.updateone(body, niceName);
    if (!recipe) {
      throw new NotFoundException('Recipe Does not exist.');
    }

    return recipe;
  }

  public async deleteRecipe(
    niceName: string,
  ): Promise<AlternativeRecipeDocument> {
    const recipe = await this.alternativeRecipeRepo.deleteRecipe(niceName);
    if (recipe == null) {
      throw new NotFoundException('Recipe Does not exist.');
    }

    return recipe;
  }
}
