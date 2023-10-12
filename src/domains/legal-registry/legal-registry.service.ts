import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLegalRegistryDTO } from './dto/createLegalRegistry.dto';
import { LegalRegistryDocument } from './schema/legal-registry.schema';
import { LegalRegistryRepository } from './repository/legal-registry.repository';

@Injectable()
export class LegalRegistryService {
  public constructor(public legalRegRepo: LegalRegistryRepository) {}

  public async createLegalRegistry(
    region: string,
    body: CreateLegalRegistryDTO,
  ): Promise<LegalRegistryDocument> {
    const legalRegDoc = await this.legalRegRepo.findOne(region, body);
    if (!legalRegDoc) {
      const legalRegDoc = await this.legalRegRepo.create(region, body);

      return legalRegDoc;
    }
    throw new BadRequestException('LegalRegistry Document already exists.');
  }
  public async fetchLegalRegistry(
    region: string,
    uniqueId: string,
  ): Promise<LegalRegistryDocument> {
    const legalRegDoc = await this.legalRegRepo.fetchOne(region, uniqueId);
    if (!legalRegDoc) {
      throw new NotFoundException('LegalRegistry Document not found.');
    }

    return legalRegDoc;
  }

  public async fetchAllLegalRegistry(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<LegalRegistryDocument[]> {
    const legalRegDocList = await this.legalRegRepo.fetchAll(
      region,
      pageNumber,
      pageSize,
    );
    if (legalRegDocList.length > 0) {
      return legalRegDocList;
    }

    return [];

    // throw new NotFoundException('LegalRegistry Document not found.');
  }
}
