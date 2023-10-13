import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateReturnedProductsDTO } from './dto/createDto/returned-products.create.dto';
import { Response } from 'express';
import { ReturnedProductsDocument } from './schema/returned-products.schema';
import { ReturnedProductsService } from './returned-products.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateReturnedProductsDTO } from './dto/updateDto/returned-products.update.dto';

@AUTH(Role.admin)
@Controller()
export class ReturnedProductsController {
  public constructor(
    public returnedProductsServices: ReturnedProductsService,
  ) {}

  @Post('ReturnedProduct')
  public async createReturnedProducts(
    @Body() body: CreateReturnedProductsDTO,
  ): Promise<ReturnedProductsDocument> {
    return await this.returnedProductsServices.createReturnedProduct(body);
  }

  @Get('ReturnedProduct/:uniqueId')
  public async fetchReturnedProduct(
    @Param('uniqueId') uniqueId: string,
  ): Promise<ReturnedProductsDocument> {
    return await this.returnedProductsServices.fetchReturnedProduct(uniqueId);
  }

  @Put('ReturnedProduct/:uniqueId')
  public async updateReturnedProducts(
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateReturnedProductsDTO,
  ): Promise<ReturnedProductsDocument> {
    return await this.returnedProductsServices.updateReturnedProduct(
      uniqueId,
      body,
    );
  }

  @Delete('ReturnedProduct/:uniqueId')
  public async deleteReturnedProducts(
    @Param('uniqueId') uniqueId: string,
  ): Promise<object> {
    return await this.returnedProductsServices.deleteReturnedProduct(uniqueId);
  }

  @Get('ReturnedProducts')
  public async fetchReturnedProducts(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<ReturnedProductsDocument[]> {
    return await this.returnedProductsServices.fetchReturnedProducts(
      pageNumber,
      pageSize,
      search,
    );
  }

  @Get('ReturnedProducts/export/:type')
  private async exportReturnedProducts(
    @Param('type') type: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.returnedProductsServices.exportFile(type);

    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/${file.type}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=PostTags.${file.type}`,
    });

    return new StreamableFile(file.data);
  }
}
