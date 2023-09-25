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
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateRecipeDto } from './dto/createRecipe/createRecipe.dto';
import { RecipeDocument } from './schema/recipe.schema';
import { RecipeService } from './recipe.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';

@AUTH(Role.admin, Role.superadmin)
@Controller()
export class RecipeController {
  public constructor(private recipeService: RecipeService) {}

  @Post('recipe')
  private async createRecipe(
    @Headers('region') region: string,
    @Body() body: CreateRecipeDto,
  ): Promise<RecipeDocument> {
    return await this.recipeService.createRecipe(region, body);
  }

  @Get('recipe/:niceName')
  private async fetchRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName,
  ): Promise<RecipeDocument> {
    return await this.recipeService.fetchRecipe(region, niceName);
  }

  @Put('recipe/:niceName')
  private async updateRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateRecipeDto,
  ): Promise<RecipeDocument> {
    return await this.recipeService.updateRecipe(region, body, niceName);
  }

  @Delete('recipe/:niceName')
  private async deleteRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<RecipeDocument> {
    return await this.recipeService.deleteRecipe(region, niceName);
  }

  @Post('recipe/toNewTouch/:identifier')
  private async cloneToNewTouch(
    @Headers('region') region: string,
    @Param('identifier') identifier: string,
    @Body() body: RecipeDocument,
  ): Promise<Partial<RecipeDocument>> {
    return await this.recipeService.cloneToNewTouch(region, identifier, body);

    // return 32;
    //this function is incomplete.
  }

  @Get('recipes')
  private async fetchAllRecipes(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<Array<RecipeDocument>> {
    return await this.recipeService.fetchAllRecipes(region, search);
  }
}
