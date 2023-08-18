import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/createRecipe/createRecipe.dto';
import { RecipeDocument } from './schema/recipe.schema';
import { RecipeService } from './recipe.service';
import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';

@Controller('recipe')
export class RecipeController {
  public constructor(private recipeService: RecipeService) {}

  @Post('create')
  public async createRecipe(
    @Headers('region') region: string,
    @Body() body: CreateRecipeDto,
  ): Promise<RecipeDocument> {
    return await this.recipeService.createRecipe(region, body);
  }

  @Get('fetchall')
  public async fetchAllRecipes(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<Array<RecipeDocument>> {
    return await this.recipeService.fetchAllRecipes(region, search);
  }

  @Get('fetchone')
  public async fetchRecipe(
    @Headers('region') region: string,
    @Query('niceName') niceName,
  ): Promise<RecipeDocument> {
    return await this.recipeService.fetchRecipe(region, niceName);
  }

  @Patch('updateone')
  public async updateRecipe(
    @Query('niceName') niceName: string,
    @Body() body: UpdateRecipeDto,
  ): Promise<RecipeDocument> {
    // console.log(body)
    return await this.recipeService.updateRecipe(body, niceName);
  }

  @Patch('deleterecipe')
  public async deleteRecipe(
    @Query('niceName') niceName: string,
  ): Promise<RecipeDocument> {
    return await this.recipeService.deleteRecipe(niceName);
  }
}
