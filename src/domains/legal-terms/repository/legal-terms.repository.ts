import { LegalTerms, LegalTermsDocument } from '../schema/legal-terms.schema';
import { CreateLegalTermsDTO } from '../dto/createLegal-terms/legal-terms.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LegalHistory } from 'src/domains/legal-history/schema/legal-history.schema';
import { Model } from 'mongoose';
import { UpdateLegalTermsDTO } from '../dto/updateLegal-terms/legal-terms.update.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LegalTermsRepository {
  public constructor(
    @InjectModel(LegalTerms.name)
    public legalTermsModel: Model<LegalTerms>,
    @InjectModel(LegalHistory.name)
    public legalHistoryModel: Model<LegalHistory>,
  ) {}

  public async createLegalTerm(
    region: string,
    body: CreateLegalTermsDTO,
  ): Promise<LegalTermsDocument> {
    const legalterm = await this.legalTermsModel.create({ region, ...body });
    await this.legalHistoryModel.create({ region, ...body, uniqueId: uuid() });

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
    await this.legalHistoryModel.create({ region, ...body, uniqueId: uuid() });

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

  public async fetchLegalTerms(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<LegalTermsDocument[]> {
    const skipAmount = (pageNumber - 1) * pageSize;

    return await this.legalTermsModel
      .find({ region, isActive: true })
      .skip(skipAmount)
      .limit(pageSize);
  }
}
