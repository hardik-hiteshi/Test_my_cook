// import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AffiliateDocument } from './schema/affiliate.schema';
import { AffiliateRepository } from './repository/affiliate.repository';
import { CreateAffiliateDTO } from './dto/createDto/createAffiliate.dto';
import hasher from 'wordpress-hash-node';
import { UpdateAffiliateDTO } from './dto/updateDto/updateAffiliate.dto';

@Injectable()
export class AffiliateService {
  public constructor(public affiliateRepo: AffiliateRepository) {}

  public async createAffiliate(
    body: CreateAffiliateDTO,
  ): Promise<AffiliateDocument> {
    const affiliate = await this.affiliateRepo.findOne(body);

    if (!affiliate) {
      body.password = await hasher.HashPassword(body.password);
      //body.password = await bcrypt.hash(body.password, 10);
      const affiliate = await this.affiliateRepo.createAffiliate(body);

      return affiliate;
    }
    throw new BadRequestException(
      'Affiliate with niceName or email Already exists.',
    );
  }

  public async fetchAffiliate(niceName: string): Promise<AffiliateDocument> {
    const affiliate = await this.affiliateRepo.fetchAffiliate(niceName);
    if (!affiliate) {
      throw new NotFoundException('Affiliate not found.');
    }

    return affiliate;
  }

  public async updateAffiliate(
    niceName: string,
    body: UpdateAffiliateDTO,
  ): Promise<AffiliateDocument> {
    let updatedAffiliate: AffiliateDocument;
    try {
      updatedAffiliate = await this.affiliateRepo.updateAffiliate(
        niceName,
        body,
      );
    } catch (e) {
      if (e.code === 11000 || e.code === 11001) {
        throw new BadRequestException(e.message);
      } else {
        throw e;
      }
    }
    if (!updatedAffiliate) {
      throw new NotFoundException('Affiliate Not found.');
    }

    return updatedAffiliate;
  }

  public async deleteAffiliate(niceName: string): Promise<object> {
    const deletedAffiliate = await this.affiliateRepo.deleteAffiliate(niceName);
    if (!deletedAffiliate) {
      throw new NotFoundException('Affiliate Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchAffiliates(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<AffiliateDocument[]> {
    const affiliatesList = await this.affiliateRepo.fetchAffiliates(
      pageNumber,
      pageSize,
      search,
    );
    if (affiliatesList.length > 0) {
      return affiliatesList;
    }

    return [];
    // throw new NotFoundException('Affiliates not found.');
  }
}
