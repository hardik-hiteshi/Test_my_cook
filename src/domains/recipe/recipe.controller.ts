import {
  Controller,
  Post,
  Patch,
  Body,
  Get,
  Query,
  Headers,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDocument } from './schema/recipe.schema';

import { CreateRecipeDto } from './dto/createRecipe/createRecipe.dto';
import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';
@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post('create')
  async createRecipe(
    @Headers('region') region: string,
    @Body() body: CreateRecipeDto,
  ): Promise<RecipeDocument> {
    return await this.recipeService.createRecipe(region, body);
  }

  @Get('fetchall')
  async fetchAllRecipes(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<Array<RecipeDocument>> {
    return await this.recipeService.fetchAllRecipes(region, search);
  }

  @Get('fetchone')
  async fetchRecipe(
    @Headers('region') region: string,
    @Query('niceName') niceName,
  ): Promise<RecipeDocument> {
    return await this.recipeService.fetchRecipe(region, niceName);
  }

  @Patch('updateone')
  async updateRecipe(
    @Query('niceName') niceName: string,
    @Body() body: UpdateRecipeDto,
  ) {
    console.log(body, niceName);
    return await this.recipeService.updateRecipe(body, niceName);
  }
}
