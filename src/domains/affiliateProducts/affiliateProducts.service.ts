import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AffiliateProductDocument } from './schema/affiliateProducts.schema';
import { AffiliateProductRepository } from './repository/affiliateProducts.repository';
import { CreateAffiliateProductDTO } from './dto/createDto/createAffiliateProducts.dto';
import { UpdateAffiliateProductDTO } from './dto/updateDto/updateAffiliateProducts.dto';

@Injectable()
export class AffiliateProductService {
  public constructor(
    public affiliateProductsRepo: AffiliateProductRepository,
  ) {}

  public async createAffiliateProduct(
    body: CreateAffiliateProductDTO,
  ): Promise<AffiliateProductDocument> {
    const affiliateProducts =
      await this.affiliateProductsRepo.createAffiliateProduct(body);

    return affiliateProducts;
  }

  public async fetchAffiliateProduct(
    uniqueId: string,
  ): Promise<AffiliateProductDocument> {
    const affiliateProducts = await this.affiliateProductsRepo.fetchOne(
      uniqueId,
    );
    if (!affiliateProducts) {
      throw new NotFoundException('Affiliate-product not found.');
    }

    return affiliateProducts;
  }

  public async updateAffiliateProduct(
    uniqueId: string,
    body: UpdateAffiliateProductDTO,
  ): Promise<AffiliateProductDocument> {
    let updatedAffiliateProduct: AffiliateProductDocument;
    try {
      updatedAffiliateProduct =
        await this.affiliateProductsRepo.updateAffiliateProduct(uniqueId, body);
    } catch (e) {
      if (e.code === 11000 || e.code === 11001) {
        throw new BadRequestException(e.message);
      } else {
        throw e;
      }
    }
    if (!updatedAffiliateProduct) {
      throw new NotFoundException('Affiliate-product Not found.');
    }

    return updatedAffiliateProduct;
  }

  public async deleteAffiliateProduct(uniqueId: string): Promise<object> {
    const deletedAffiliateProduct =
      await this.affiliateProductsRepo.deleteAffiliateProduct(uniqueId);

    if (!deletedAffiliateProduct) {
      throw new NotFoundException('Affiliate-product Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchAffiliateProducts(
    search?: string,
  ): Promise<AffiliateProductDocument[]> {
    const affiliateProductssList =
      await this.affiliateProductsRepo.fetchAffiliateProducts(search);
    if (affiliateProductssList.length > 0) {
      return affiliateProductssList;
    }

    return [];
    // throw new NotFoundException('AffiliateProducts not found.');
  }
}
