import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AffiliateConfigDocument } from './schema/affiliateConfig.schema';
import { AffiliateConfigRepository } from './repository/affiliateConfig.repository';
import { CreateAffiliateConfigDTO } from './dto/createDto/createAffiliateConfig.dto';
import { UpdateAffiliateConfigDTO } from './dto/updateDto/updateAffiliateConfig.dto';

@Injectable()
export class AffiliateConfigService {
  public constructor(public affiliateConfigRepo: AffiliateConfigRepository) {}

  public async createAffiliateConfig(
    body: CreateAffiliateConfigDTO,
  ): Promise<AffiliateConfigDocument> {
    const affiliateConfig = await this.affiliateConfigRepo.findOne(body);

    if (!affiliateConfig) {
      if (body.cookieName) {
        body.cookieName = body.cookieName
          .toUpperCase()
          .replace(/\s/g, '')
          .trim();
      }
      const affiliateConfig =
        await this.affiliateConfigRepo.createAffiliateConfig(body);

      return affiliateConfig;
    }
    throw new BadRequestException(
      'AffiliateConfig with cookieName Already exists.',
    );
  }

  public async fetchAffiliateConfig(
    cookieName: string,
  ): Promise<AffiliateConfigDocument> {
    const affiliateConfig = await this.affiliateConfigRepo.fetchOne(cookieName);
    if (!affiliateConfig) {
      throw new NotFoundException('Affiliate-Config not found.');
    }

    return affiliateConfig;
  }

  public async updateAffiliateConfig(
    cookieName: string,
    body: UpdateAffiliateConfigDTO,
  ): Promise<AffiliateConfigDocument> {
    let updatedAffiliateConfig: AffiliateConfigDocument;
    try {
      updatedAffiliateConfig =
        await this.affiliateConfigRepo.updateAffiliateConfig(cookieName, body);
    } catch (e) {
      if (e.code === 11000 || e.code === 11001) {
        throw new BadRequestException(e.message);
      } else {
        throw e;
      }
    }
    if (!updatedAffiliateConfig) {
      throw new NotFoundException('Affiliate-Config Not found.');
    }

    return updatedAffiliateConfig;
  }

  public async deleteAffiliateConfig(cookieName: string): Promise<object> {
    const deletedAffiliateConfig =
      await this.affiliateConfigRepo.deleteAffiliateConfig(cookieName);

    if (!deletedAffiliateConfig) {
      throw new NotFoundException('Affiliate-Config Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchAffiliateConfigs(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<AffiliateConfigDocument[]> {
    const affiliateConfigsList =
      await this.affiliateConfigRepo.fetchAffiliateConfigs(
        pageNumber,
        pageSize,
        search,
      );
    if (affiliateConfigsList.length > 0) {
      return affiliateConfigsList;
    }

    return [];
    // throw new NotFoundException('AffiliateConfigs not found.');
  }
}
