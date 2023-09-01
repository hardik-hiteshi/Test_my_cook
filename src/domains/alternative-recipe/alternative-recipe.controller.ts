import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AlternativeRecipeDocument } from './schema/alternativeRecipe.schema';
import { AlternativeRecipeService } from './alternative-recipe.service';
import { CreateAlternativeRecipeDTO } from './dto/create alternative-recipe/createalternative-recipe.dto';
import { UpdateAlternativeRecipeDTO } from './dto/update alternative-recipe/updatealternative-recipe.dto';

@Controller('alternative-recipe')
export class AlternativeRecipeController {
  public constructor(
    public alternativeRecipeServices: AlternativeRecipeService,
  ) {}

  @Post('create')
  public async createRecipe(
    @Headers('region') region: string,
    @Body() body: CreateAlternativeRecipeDTO,
  ): Promise<AlternativeRecipeDocument> {
    return await this.alternativeRecipeServices.createRecipe(region, body);
  }

  @Get('fetchall')
  public async fetchAllRecipes(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<Array<AlternativeRecipeDocument>> {
    return await this.alternativeRecipeServices.fetchAllRecipes(region, search);
  }

  @Get('fetch/:niceName')
  public async fetchRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName,
  ): Promise<AlternativeRecipeDocument> {
    return await this.alternativeRecipeServices.fetchRecipe(region, niceName);
  }

  @Patch('update/:niceName')
  public async updateRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateAlternativeRecipeDTO,
  ): Promise<AlternativeRecipeDocument> {
    // console.log(body)
    return await this.alternativeRecipeServices.updateRecipe(
      region,
      body,
      niceName,
    );
  }

  @Patch('delete/:niceName')
  public async deleteRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<AlternativeRecipeDocument> {
    return await this.alternativeRecipeServices.deleteRecipe(region, niceName);
  }
}
