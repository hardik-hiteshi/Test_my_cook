import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AffiliateProductDocument } from './schema/affiliateProducts.schema';
import { AffiliateProductService } from './affiliateProducts.service';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateAffiliateProductDTO } from './dto/createDto/createAffiliateProducts.dto';
import { Role } from '../auth/roles/permission.roles';
import { UpdateAffiliateProductDTO } from './dto/updateDto/updateAffiliateProducts.dto';

@AUTH(Role.admin)
@Controller()
export class AffiliateProductController {
  public constructor(
    public affiliateProductServices: AffiliateProductService,
  ) {}

  @Post('affiliateproduct')
  public async createAffiliateProduct(
    @Body() body: CreateAffiliateProductDTO,
  ): Promise<AffiliateProductDocument> {
    return await this.affiliateProductServices.createAffiliateProduct(body);
  }

  @Get('affiliateproduct/:uniqueId')
  public async fetchAffiliateProduct(
    @Param('uniqueId') uniqueId: string,
  ): Promise<AffiliateProductDocument> {
    return await this.affiliateProductServices.fetchAffiliateProduct(uniqueId);
  }

  @Put('affiliateproduct/:uniqueId')
  public async updateAffiliateProduct(
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateAffiliateProductDTO,
  ): Promise<AffiliateProductDocument> {
    return await this.affiliateProductServices.updateAffiliateProduct(
      uniqueId,
      body,
    );
  }

  @Delete('affiliateproduct/:uniqueId')
  public async deleteAffiliateProduct(
    @Param('uniqueId') uniqueId: string,
  ): Promise<object> {
    return await this.affiliateProductServices.deleteAffiliateProduct(uniqueId);
  }

  @Get('affiliateproducts')
  public async fetchAffiliateProducts(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<AffiliateProductDocument[]> {
    return await this.affiliateProductServices.fetchAffiliateProducts(
      pageNumber,
      pageSize,
      search,
    );
  }
}
