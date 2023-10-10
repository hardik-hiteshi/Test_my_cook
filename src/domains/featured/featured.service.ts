import { Injectable, NotFoundException } from '@nestjs/common';
import { FeaturedDocument } from './schema/featured.schema';
import { FeaturedRepository } from './repository/featured.repository';
import { UpdateFeatureDTO } from './dto/updatefeatured.dto';

@Injectable()
export class FeaturedService {
  public constructor(public featuredRepo: FeaturedRepository) {}
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
    const updatedData = await this.featuredRepo.updateFeatured(region, body);
    if (updatedData) {
      return updatedData;
    }
    throw new NotFoundException('Updated data not found');
  }

  public async deleteFeatured(region: string, type: string): Promise<object> {
    const deletedData = await this.featuredRepo.deleteFeatured(type, region);

    if (deletedData) {
      return { message: 'Deleted Success' };
    }
    throw new NotFoundException('Feature Not found.');
  }
}
