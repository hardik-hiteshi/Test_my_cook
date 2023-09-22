import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlternativeRecipeDocument } from './schema/alternativeRecipe.schema';
import { AlternativeRecipeRepository } from './repository/alternative-recipe.repository';
import { CategoriesDTO } from './dto/create alternative-recipe/subDto/alternative-recipe.categories.dto';
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
    const alternativeRecipe = await this.alternativeRecipeRepo.findOne(
      region,
      body,
    );
    if (!alternativeRecipe) {
      if (body.categories && !body.category && !body.categoryNiceName) {
        if (body.categories.length > 0) {
          body.category = body.categories[0].name;
          body.categoryNiceName = body.categories[0].niceName;
        }
      }
      if (body.category && body.categoryNiceName) {
        if (!body.categories && body.category && body.categoryNiceName) {
          body.categories = [];
          const obj = {
            id: body.catId,
            name: `${body.category}`,
            niceName: `${body.categoryNiceName}`,
          };
          const data = body.categories.find((item: CategoriesDTO) => {
            item.id === body.catId;
          });
          if (!data) {
            body.categories.push(obj);
          }
        }
      }
      const alternativeRecipe = await this.alternativeRecipeRepo.create(
        region,
        body,
      );

      return alternativeRecipe;
    }
    if (alternativeRecipe)
      throw new BadRequestException('Alternative Recipe already exists.');
  }

  public async fetchAllRecipes(
    region: string,
    search: string,
  ): Promise<Array<AlternativeRecipeDocument>> {
    const alternativeRecipeList = await this.alternativeRecipeRepo.findAll(
      region,
      search,
    );
    if (alternativeRecipeList.length <= 0) {
      throw new NotFoundException('No Alternative recipe found');
    }

    return alternativeRecipeList;
  }

  public async fetchRecipe(
    region: string,
    niceName: string,
  ): Promise<AlternativeRecipeDocument> {
    const alternativeRecipe = await this.alternativeRecipeRepo.fetchOne(
      region,
      niceName,
    );
    if (!alternativeRecipe) {
      throw new NotFoundException('Alternative Recipe Does not exist.');
    }

    return alternativeRecipe;
  }

  public async updateRecipe(
    region: string,
    body: UpdateAlternativeRecipeDTO,
    niceName: string,
  ): Promise<AlternativeRecipeDocument> {
    //if (body.categories && !body.category && !body.categoryNiceName) {
    if (body.categories.length > 0) {
      body.category = body.categories[0].name;
      body.categoryNiceName = body.categories[0].niceName;
    } else {
      body.category = '';
      body.categoryNiceName = '';
    }
    //}
    if (body.category && body.categoryNiceName) {
      if (!body.categories && body.category && body.categoryNiceName) {
        body.categories = [];
        const obj = {
          id: body.catId,
          name: `${body.category}`,
          niceName: `${body.categoryNiceName}`,
        };
        const data = body.categories.find((item: CategoriesDTO) => {
          item.id === body.catId;
        });
        if (!data) {
          body.categories.push(obj);
        }
      }
    }

    const updatedaltRecipe = await this.alternativeRecipeRepo.updateone(
      region,
      body,
      niceName,
    );
    if (!updatedaltRecipe) {
      throw new NotFoundException('Alternative Recipe Does not exist.');
    }

    return updatedaltRecipe;
  }

  public async deleteRecipe(
    region: string,
    niceName: string,
  ): Promise<AlternativeRecipeDocument> {
    const deletedaltRecipe = await this.alternativeRecipeRepo.deleteRecipe(
      region,
      niceName,
    );
    if (!deletedaltRecipe) {
      throw new NotFoundException('Alternative Recipe Does not exist.');
    }

    return deletedaltRecipe;
  }
}
