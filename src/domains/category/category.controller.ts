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
import { CategoryDocument } from './schema/category.schema';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/createcategory/createcategory.dto';
import { UpdateCategoryDTO } from './dto/updatecategory/updatecategory.dto';

@Controller('category')
export class CategoryController {
  public constructor(public categoryServices: CategoryService) {}

  @Post('create')
  public async createCategory(
    @Headers('region') region: string,
    @Body() body: CreateCategoryDTO,
  ): Promise<CategoryDocument> {
    // console.log(body.translations.to)
    return await this.categoryServices.createCategory(region, body);
  }

  @Get('fetchone')
  public async fetchCategory(
    @Headers('region') region: string,
    @Query('niceName') niceName: string,
    @Query('id') id: string,
  ): Promise<CategoryDocument> {
    return await this.categoryServices.fetchCategory(region, id, niceName);
  }
  @Patch('update/:niceName')
  public async updateCategory(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateCategoryDTO,
  ): Promise<CategoryDocument> {
    return await this.categoryServices.updateCategory(region, niceName, body);
  }
  @Patch('delete/:niceName')
  public async deleteCategory(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<CategoryDocument> {
    return await this.categoryServices.deleteCategory(region, niceName);
  }
  @Get('fetchall')
  public async fetchCategories(
    @Headers('region') region: string,
    @Query('search') search: string,
  ): Promise<CategoryDocument[]> {
    return await this.categoryServices.fetchCategories(region, search);
  }
}
