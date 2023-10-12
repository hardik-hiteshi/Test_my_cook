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
import { CreateIngredientDto, UpdateIngredientDto } from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { IngredientDocument } from './schema/ingredient.schema';
import { IngredientService } from './ingredient.service';
import { Role } from '../auth/roles/permission.roles';
@AUTH(Role.admin)
@Controller()
export class IngredientController {
  public constructor(private ingredientService: IngredientService) {}

  @Post('ingredient')
  private async createIngredient(
    @Body() body: CreateIngredientDto,
    @Headers('region') region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientService.createOne(body, region);
  }

  @Put('ingredient/:nicename')
  private async updateIngredient(
    @Body() body: UpdateIngredientDto,
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientService.updateOne(body, region, niceName);
  }

  @Get('ingredient/:nicename')
  private async geteIngredient(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientService.findOne(niceName, region);
  }

  @Delete('ingredient/:nicename')
  private async deleteIngredient(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<object> {
    return await this.ingredientService.deleteOne(region, niceName);
  }

  @Get('ingredients')
  private async getAllIngredient(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<IngredientDocument[]> {
    return await this.ingredientService.findAll(region, pageNumber, pageSize);
  }
}
