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
import { AlternativeRecipeDocument } from './schema/alternativeRecipe.schema';
import { AlternativeRecipeService } from './alternative-recipe.service';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateAlternativeRecipeDTO } from './dto/create alternative-recipe/createalternative-recipe.dto';
import { Role } from '../auth/roles/permission.roles';
import { UpdateAlternativeRecipeDTO } from './dto/update alternative-recipe/updatealternative-recipe.dto';

@AUTH(Role.admin)
@Controller()
export class AlternativeRecipeController {
  public constructor(
    public alternativeRecipeServices: AlternativeRecipeService,
  ) {}

  @Get('AlternativeRecipe/:niceName')
  public async fetchRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName,
  ): Promise<AlternativeRecipeDocument> {
    return await this.alternativeRecipeServices.fetchRecipe(region, niceName);
  }

  @Post('AlternativeRecipe')
  public async createRecipe(
    @Headers('region') region: string,
    @Body() body: CreateAlternativeRecipeDTO,
  ): Promise<AlternativeRecipeDocument> {
    return await this.alternativeRecipeServices.createRecipe(region, body);
  }

  @Put('AlternativeRecipe/:niceName')
  public async updateRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateAlternativeRecipeDTO,
  ): Promise<AlternativeRecipeDocument> {
    return await this.alternativeRecipeServices.updateRecipe(
      region,
      body,
      niceName,
    );
  }

  @Delete('AlternativeRecipe/:niceName')
  public async deleteRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<object> {
    return await this.alternativeRecipeServices.deleteRecipe(region, niceName);
  }

  @Get('AlternativeRecipes')
  public async fetchAllRecipes(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<Array<AlternativeRecipeDocument>> {
    return await this.alternativeRecipeServices.fetchAllRecipes(
      region,
      pageNumber,
      pageSize,
      search,
    );
  }
}
