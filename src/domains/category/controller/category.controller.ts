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
import { AUTH } from '../../auth/decorator/auth.decorator';
import { CategoryDocument } from '../schema/category.schema';
import { CategoryService } from '../category.service';
import { CreateCategoryDTO } from '../dto/createcategory/createcategory.dto';
import { Response } from 'express';
import { Role } from '../../auth/roles/permission.roles';
import { UpdateCategoryDTO } from '../dto/updatecategory/updatecategory.dto';
@AUTH(Role.admin)
@Controller()
export class CategoryController {
  public constructor(public categoryServices: CategoryService) {}

  @Post('category')
  public async createCategory(
    @Headers('region') region: string,
    @Body() body: CreateCategoryDTO,
  ): Promise<CategoryDocument> {
    return await this.categoryServices.createCategory(region, body);
  }

  @Get('category/:niceName')
  public async fetchCategory(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<CategoryDocument> {
    return await this.categoryServices.fetchCategory(region, niceName);
  }

  @Put('category/:niceName')
  public async updateCategory(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateCategoryDTO,
  ): Promise<CategoryDocument> {
    return await this.categoryServices.updateCategory(region, niceName, body);
  }

  @Delete('category/:niceName')
  public async deleteCategory(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<object> {
    return await this.categoryServices.deleteCategory(region, niceName);
  }

  @Get('categories')
  public async fetchCategories(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search: string,
  ): Promise<CategoryDocument[]> {
    return await this.categoryServices.fetchCategories(
      region,
      pageNumber,
      pageSize,
      search,
    );
  }
  @Post('categories/export-to-json')
  public async exportToJson(
    @Headers('region') region: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const expData = await this.categoryServices.exportToJson(region);
    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': 'attachment; filename=Categories.json',
    });

    return new StreamableFile(expData);
  }
}
