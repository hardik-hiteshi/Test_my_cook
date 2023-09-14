import { Controller, Get, Headers, Res, StreamableFile } from '@nestjs/common';
import { CategoryService } from '../category.service';
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
  public constructor(public categoryServices: CategoryService) {}

  @Get('/export-to-json')
  public async exportToJson(
    @Headers('region') region: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const expData = await this.categoryServices.exportToJson(
      // region
      'EN-TEST',
    );
    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': 'attachment; filename=Categories.json',
    });

    return new StreamableFile(expData);
  }
}
