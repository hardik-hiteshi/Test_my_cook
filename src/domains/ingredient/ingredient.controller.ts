import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateIngredientDto, UpdateIngredientDto } from './dtos';
import { IngredientDocument } from './schema/ingredient.schema';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
export class IngredientController {
  public constructor(private ingredientService: IngredientService) {}

  @Post()
  private async createIngredient(
    @Body() body: CreateIngredientDto,
    @Headers('region') region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientService.createOne(body, region);
  }

  @Put(':nicename')
  private async updateIngredient(
    @Body() body: UpdateIngredientDto,
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientService.updateOne(body, region, niceName);
  }

  @Get(':nicename')
  private async geteIngredient(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientService.findOne(niceName, region);
  }
  @Get()
  private async getAllIngredient(
    @Headers('region') region: string,
  ): Promise<IngredientDocument[]> {
    return await this.ingredientService.findAll(region);
  }

  @Delete(':nicename')
  private async deleteIngredient(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.ingredientService.deleteOne(region, niceName);
  }
}
