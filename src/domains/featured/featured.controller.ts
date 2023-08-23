import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateFeatureDTO } from './dto/createfeatured.dto';
import { FeaturedDocument } from './schema/featured.schema';
import { FeaturedService } from './featured.service';
import { UpdateFeatureDTO } from './dto/updatefeatured.dto';

@Controller('featured')
export class FeaturedController {
  public constructor(public featuredServices: FeaturedService) {}

  @Post('create')
  public async create(
    @Body() body: CreateFeatureDTO,
  ): Promise<FeaturedDocument> {
    return await this.featuredServices.create(body);
  }

  @Get('fetch')
  public async fetchFeatured(
    @Headers('region') region: string,
    @Query('type') type: string,
    @Query('search') search?: string,
  ): Promise<FeaturedDocument> {
    return await this.featuredServices.fetchFeatured(region, type, search);
  }
  @Patch('update')
  public async updateFeatured(
    @Headers('region') region: string,
    @Body() body: UpdateFeatureDTO,
  ): Promise<FeaturedDocument> {
    return await this.featuredServices.updateFeatured(region, body);
  }
  @Patch('delete')
  public async deleteFeatured(
    @Headers('region') region: string,
    @Query('type') type: string,
  ): Promise<FeaturedDocument> {
    return await this.featuredServices.deleteFeatured(type, region);
  }
}
