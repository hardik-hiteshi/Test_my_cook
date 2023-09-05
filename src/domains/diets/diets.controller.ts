import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDietDto, UpdateDietDto } from './dtos';
import { DietDocument } from './schema/diets.schema';
import { DietsService } from './diets.service';

@Controller('diets')
export class DietsController {
  public constructor(private dietService: DietsService) {}

  @Post()
  private async createDiet(
    @Body() body: CreateDietDto,
    @Headers('region') region: string,
  ): Promise<DietDocument> {
    return await this.dietService.createOne(body, region);
  }

  @Patch(':nicename')
  private async updateDiet(
    @Headers('region') region: string,
    @Param('nicename') niceName: string,
    @Body() body: UpdateDietDto,
  ): Promise<DietDocument> {
    return await this.dietService.updateOne(region, niceName, body);
  }

  @Get(':nicename')
  private async getdiet(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<DietDocument> {
    return await this.dietService.findOne(niceName, region);
  }

  @Get()
  private async findAll(
    @Headers('region') region: string,
  ): Promise<DietDocument[]> {
    return await this.dietService.findAll(region);
  }

  @Delete(':nicename')
  private async deleteDiet(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.dietService.deleteOne(niceName, region);
  }
}
