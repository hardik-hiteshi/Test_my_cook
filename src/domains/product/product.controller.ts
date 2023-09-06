import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { ProductDocument } from './schema/product.schema';
import { ProductService } from './product.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller('product')
export class ProductController {
  public constructor(private productService: ProductService) {}
  @Post()
  private async createProduct(
    @Body() body: CreateProductDto,
  ): Promise<ProductDocument> {
    return await this.productService.createOne(body);
  }
  @Get(':nicename')
  private async getProduct(
    @Param('nicename') niceName: string,
  ): Promise<ProductDocument> {
    return await this.productService.findOne(niceName);
  }
  @Get()
  private async getAllProducts(): Promise<ProductDocument[]> {
    return await this.productService.findAll();
  }
  @Patch(':nicename')
  private async updateProduct(
    @Param('nicename') niceName: string,
    @Body() body: UpdateProductDto,
  ): Promise<ProductDocument> {
    return await this.productService.updateOne(niceName, body);
  }
  // using hard delete for now
  @Delete(':nicename')
  private async deleteProduct(
    @Param('nicename') niceName: string,
  ): Promise<void> {
    await this.productService.deleteOne(niceName);
  }
}
