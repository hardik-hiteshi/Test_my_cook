import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFeatureDTO } from './dto/createfeatured.dto';
import { FeaturedDocument } from './schema/featured.schema';
import { FeaturedRepository } from './repository/featured.repository';
import { UpdateFeatureDTO } from './dto/updatefeatured.dto';

@Injectable()
export class FeaturedService {
  public constructor(public featuredRepo: FeaturedRepository) {}

  public async create(
    region: string,
    body: CreateFeatureDTO,
  ): Promise<FeaturedDocument> {
    const featured = await this.featuredRepo.findOne(region, body);
    if (!featured) {
      const featured = await this.featuredRepo.create(region, body);

      return featured;
    }
    throw new BadRequestException('Feature already exists.');
  }

  public async fetchFeatured(
    region: string,
    type: string,
    search?: string,
  ): Promise<FeaturedDocument> {
    const featured = await this.featuredRepo.fetchFeatured(
      region,
      type,
      search,
    );
    if (featured) {
      return featured;
    }
    throw new NotFoundException('No features found');
  }
  public async updateFeatured(
    region: string,
    body: UpdateFeatureDTO,
  ): Promise<FeaturedDocument> {
    const data = await this.featuredRepo.fetchFeatured(region, body.type);
    if (data) {
      const updatedData = await this.featuredRepo.updateFeatured(region, body);
      if (!updatedData) throw new NotFoundException('Feature not Found.');

      return updatedData;
    }
    throw new NotFoundException('Feature not Found.');
  }

  public async deleteFeatured(
    region: string,
    type: string,
  ): Promise<FeaturedDocument> {
    const deletedData = await this.featuredRepo.deleteFeatured(type, region);

    if (deletedData) {
      return deletedData;
    }
    throw new NotFoundException('Feature Not found.');
  }
}
