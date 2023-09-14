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
import { CreateAlternativeRecipeDTO } from './dto/create alternative-recipe/createalternative-recipe.dto';
import { UpdateAlternativeRecipeDTO } from './dto/update alternative-recipe/updatealternative-recipe.dto';

@Controller('AlternativeRecipe')
export class AlternativeRecipeController {
  public constructor(
    public alternativeRecipeServices: AlternativeRecipeService,
  ) {}

  @Get(':niceName')
  public async fetchRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName,
  ): Promise<AlternativeRecipeDocument> {
    return await this.alternativeRecipeServices.fetchRecipe(region, niceName);
  }
  @Post()
  public async createRecipe(
    @Headers('region') region: string,
    @Body() body: CreateAlternativeRecipeDTO,
  ): Promise<AlternativeRecipeDocument> {
    return await this.alternativeRecipeServices.createRecipe(region, body);
  }
  @Put(':niceName')
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

  @Delete(':niceName')
  public async deleteRecipe(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<AlternativeRecipeDocument> {
    return await this.alternativeRecipeServices.deleteRecipe(region, niceName);
  }
  @Get()
  public async fetchAllRecipes(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<Array<AlternativeRecipeDocument>> {
    return await this.alternativeRecipeServices.fetchAllRecipes(region, search);
  }
}
