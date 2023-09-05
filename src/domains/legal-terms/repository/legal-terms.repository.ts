import { LegalTerms, LegalTermsDocument } from '../schema/legal-terms.schema';
import { CreateLegalTermsDTO } from '../dto/createLegal-terms/legal-terms.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateLegalTermsDTO } from '../dto/updateLegal-terms/legal-terms.update.dto';
@Injectable()
export class LegalTermsRepository {
  public constructor(
    @InjectModel(LegalTerms.name)
    public legalTermsModel: Model<LegalTerms>,
  ) {}

  public async createLegalTerm(
    region: string,
    body: CreateLegalTermsDTO,
  ): Promise<LegalTermsDocument> {
    const legalterm = await this.legalTermsModel.create({ region, ...body });

    return legalterm;
  }

  public async fetchLegalTerm(region: string): Promise<LegalTermsDocument> {
    const legalterm = await this.legalTermsModel.findOne({
      region,
      isActive: true,
    });

    return legalterm;
  }

  public async updateLegalTerm(
    region: string,
    body: UpdateLegalTermsDTO,
  ): Promise<LegalTermsDocument> {
    const updatedLegalTerm = await this.legalTermsModel.findOneAndUpdate(
      { region, isActive: true },
      body,
      { new: true },
    );

    return updatedLegalTerm;
  }

  public async deleteLegalTerm(region: string): Promise<LegalTermsDocument> {
    const deletedLegalTerm = await this.legalTermsModel.findOneAndUpdate(
      { region, isActive: true },
      { isActive: false },
      { new: true },
    );

    return deletedLegalTerm;
  }

  public async fetchLegalTerms(region: string): Promise<LegalTermsDocument[]> {
    return await this.legalTermsModel.find({ region, isActive: true });
  }
}
