import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { ProductDocument } from './schema/product.schema';
import { ProductService } from './product.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
export class ProductController {
  public constructor(private productService: ProductService) {}

  @Post('product')
  private async createProduct(
    @Body() body: CreateProductDto,
  ): Promise<ProductDocument> {
    return await this.productService.createOne(body);
  }

  @Get('product/:nicename')
  private async getProduct(
    @Param('nicename') niceName: string,
  ): Promise<ProductDocument> {
    return await this.productService.findOne(niceName);
  }

  @Put('product/:nicename')
  private async updateProduct(
    @Param('nicename') niceName: string,
    @Body() body: UpdateProductDto,
  ): Promise<ProductDocument> {
    return await this.productService.updateOne(niceName, body);
  }

  // using hard delete for now
  @Delete('product/:nicename')
  private async deleteProduct(
    @Param('nicename') niceName: string,
  ): Promise<object> {
    return await this.productService.deleteOne(niceName);
  }

  @Get('products')
  private async getAllProducts(): Promise<ProductDocument[]> {
    return await this.productService.findAll();
  }
}
