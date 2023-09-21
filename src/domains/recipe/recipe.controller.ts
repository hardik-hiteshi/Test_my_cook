import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/createRecipe/createRecipe.dto';
import { RecipeDocument } from './schema/recipe.schema';
import { RecipeService } from './recipe.service';
import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';

@Controller('recipe')
export class RecipeController {
  public constructor(private recipeService: RecipeService) {}

  @Post()
  private async createRecipe(
    @Headers('region') region: string,
    @Body() body: CreateRecipeDto,
  ): Promise<RecipeDocument> {
    return await this.recipeService.createRecipe(region, body);
  }

  @Get()
  private async fetchAllRecipes(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<Array<RecipeDocument>> {
    return await this.recipeService.fetchAllRecipes(region, search);
  }

  @Get(':niceName')
  private async fetchRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName,
  ): Promise<RecipeDocument> {
    return await this.recipeService.fetchRecipe(region, niceName);
  }

  @Put(':niceName')
  private async updateRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateRecipeDto,
  ): Promise<RecipeDocument> {
    return await this.recipeService.updateRecipe(region, body, niceName);
  }

  @Delete(':niceName')
  private async deleteRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<RecipeDocument> {
    return await this.recipeService.deleteRecipe(region, niceName);
  }
  @Post('/toNewTouch/:identifier')
  private async cloneToNewTouch(
    @Headers('region') region: string,
    @Param('identifier') identifier: string,
    @Body() body: RecipeDocument,
  ): Promise<Partial<RecipeDocument>> {
    return await this.recipeService.cloneToNewTouch(region, identifier, body);

    // return 32;
    //this function is incomplete.
  }
}
