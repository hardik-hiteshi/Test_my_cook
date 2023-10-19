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
  Res,
  StreamableFile,
} from '@nestjs/common';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateRecipeDto } from './dto/createRecipe/createRecipe.dto';
// import { GET_USER } from '../auth/decorator';
import { RecipeDocument } from './schema/recipe.schema';
import { RecipeService } from './recipe.service';
import { Response } from 'express';
import { Role } from '../auth/roles/permission.roles';
import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';
// import { UserDocument } from '../user/schema/user.schema';

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
  ): Promise<object> {
    return await this.recipeService.deleteRecipe(region, niceName);
  }

  @Post('recipe/toNewTouch/:identifier')
  private async cloneToNewTouch(
    @Headers('region') region: string,
    @Param('identifier') identifier: string,
    @Body() body: RecipeDocument,
  ): Promise<Partial<RecipeDocument>> {
    return await this.recipeService.cloneToNewTouch(region, identifier, body);
  }

  @Get('recipes')
  private async fetchAllRecipes(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<Array<RecipeDocument>> {
    return await this.recipeService.fetchAllRecipes(region, search);
  }

  @Get('recipes/export/:type')
  private async exportRecipes(
    @Headers('region') region: string,
    @Param('type') type: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.recipeService.exportFile(region, type);

    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/${file.type}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=Recipes.${file.type}`,
    });

    return new StreamableFile(file.data);
  }

  // @Post('/:niceName/comment/:parent')
  // private async addComment(
  //   @Headers('region') region: string,
  //   @Param('niceName') niceName: string,
  //   @Param('parent') parent: string,
  //   @Body() body: RecipeDocument,
  //   @GET_USER() user: UserDocument,
  // ): Promise<Partial<RecipeDocument>> {
  //   return await this.recipeService.addComment(
  //     region,
  //     niceName,
  //     parent,
  //     body,
  //     user,
  //   );
  // }
}
