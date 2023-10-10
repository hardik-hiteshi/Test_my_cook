import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Put,
  Query,
} from '@nestjs/common';

import { AUTH } from '../auth/decorator/auth.decorator';
import { FeaturedDocument } from './schema/featured.schema';
import { FeaturedService } from './featured.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateFeatureDTO } from './dto/updatefeatured.dto';
@AUTH(Role.admin)
@Controller('featured')
export class FeaturedController {
  public constructor(public featuredServices: FeaturedService) {}

  //   @Post('create')
  //   public async create(
  //     @Headers('region') region: string,
  //     @Body() body: CreateFeatureDTO,
  //   ): Promise<FeaturedDocument> {
  //     return await this.featuredServices.create(region, body);
  //   }

  @Get()
  public async fetchFeatured(
    @Headers('region') region: string,
    @Query('type') type: string,
    @Query('search') search?: string,
  ): Promise<FeaturedDocument> {
    return await this.featuredServices.fetchFeatured(region, type, search);
  }

  @Put()
  public async upsertFeatured(
    @Headers('region') region: string,
    @Body() body: UpdateFeatureDTO,
  ): Promise<FeaturedDocument> {
    return await this.featuredServices.updateFeatured(region, body);
  }

  @Delete(':type')
  public async deleteFeatured(
    @Headers('region') region: string,
    @Param('type') type: string,
  ): Promise<object> {
    return await this.featuredServices.deleteFeatured(type, region);
  }
}
