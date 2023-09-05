import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLegalTermsDTO } from './dto/createLegal-terms/legal-terms.create.dto';
import { LegalTermsDocument } from './schema/legal-terms.schema';
import { LegalTermsRepository } from './repository/legal-terms.repository';
import { UpdateLegalTermsDTO } from './dto/updateLegal-terms/legal-terms.update.dto';

@Injectable()
export class LegalTermsService {
  public constructor(public legalRepo: LegalTermsRepository) {}

  public async createLegalTerm(
    region: string,
    body: CreateLegalTermsDTO,
  ): Promise<LegalTermsDocument> {
    const legalterm = await this.legalRepo.fetchLegalTerm(region);
    if (!legalterm) {
      const legalterm = await this.legalRepo.createLegalTerm(region, body);

      return legalterm;
    }
    throw new BadRequestException('Region alredy exists.');
  }

  public async fetchLegalTerm(region: string): Promise<LegalTermsDocument> {
    const legalterm = await this.legalRepo.fetchLegalTerm(region);
    if (!legalterm) {
      throw new NotFoundException('No Legal Term found.');
    }

    return legalterm;
  }

  public async updateLegalTerm(
    region: string,
    body: UpdateLegalTermsDTO,
  ): Promise<LegalTermsDocument> {
    const updatedLegalTerm = await this.legalRepo.updateLegalTerm(region, body);
    if (!updatedLegalTerm) {
      throw new NotFoundException('No Updated document found.');
    }

    return updatedLegalTerm;
  }

  public async deleteLegalTerm(region: string): Promise<LegalTermsDocument> {
    const deletedLegalTerm = await this.legalRepo.deleteLegalTerm(region);
    if (!deletedLegalTerm) {
      throw new NotFoundException('No Deleted document found.');
    }

    return deletedLegalTerm;
  }
  public async fetchLegalTerms(region: string): Promise<LegalTermsDocument[]> {
    return await this.legalRepo.fetchLegalTerms(region);
  }
}
