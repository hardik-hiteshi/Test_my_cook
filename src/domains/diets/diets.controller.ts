import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateDietDto, CreateManyDietDto, UpdateDietDto } from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { DietDocument } from './schema/diets.schema';
import { DietsService } from './diets.service';
import { DietTo } from './schema/subSchema/dietTo.subSchema';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
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

  @Put(':nicename')
  private async updateDiet(
    @Headers('region') region: string,
    @Param('nicename') niceName: string,
    @Body() body: UpdateDietDto,
  ): Promise<DietDocument> {
    return await this.dietService.updateOne(region, niceName, body);
  }

  @Get('enum')
  private async getDistinctNiceName(
    @Headers('region') region: string,
  ): Promise<string[]> {
    return this.dietService.findDistinctNiceName(region);
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
  // using hard delete might use soft delete in future
  @Delete(':nicename')
  private async deleteDiet(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.dietService.deleteOne(niceName, region);
  }

  @Get('/:nicename/tags')
  private async getTagsByNiceName(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<DietDocument['tags']> {
    return this.dietService.findTags(niceName, region);
  }
  @Get('/:nicename/tags/:index')
  private async getTagsByNiceNameIndex(
    @Param('nicename') niceName: string,
    @Param('index', new ParseIntPipe()) index: number,
    @Headers('region') region: string,
  ): Promise<string> {
    return this.dietService.findOneTag(niceName, index, region);
  }

  @Get('/:nicename/translation.to/:index')
  private async getTranslationByniceNameIndex(
    @Param('nicename') niceName: string,
    @Param('index', new ParseIntPipe()) index: number,
    @Headers('region') region: string,
  ): Promise<DietTo> {
    return this.dietService.findOneTranslation(niceName, index, region);
  }

  @Get('/:nicename/translation.to')
  private async getTranslationByniceName(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<DietTo[]> {
    return this.dietService.findTranslation(niceName, region);
  }

  @Post('create-many')
  private async createManyDiet(
    @Body() body: CreateManyDietDto,
  ): Promise<DietDocument[]> {
    return this.dietService.createManyDiet(body);
  }
  @Delete(':nicename/image')
  private async deleteImage(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    return await this.dietService.deleteImage(region, niceName);
  }
}
