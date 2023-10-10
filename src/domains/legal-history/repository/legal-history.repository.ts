import {
  LegalHistory,
  LegalHistoryDocument,
} from '../schema/legal-history.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LegalHistoryRepository {
  public constructor(
    @InjectModel(LegalHistory.name) public lhModel: Model<LegalHistory>,
  ) {}

  public async fetchAllLH(
    region: string,
  ): Promise<Partial<LegalHistoryDocument>[]> {
    return await this.lhModel
      .find({ region })
      .select('region version uniqueId');
  }

  public async fetchLH(
    region: string,
    uniqueId: string,
  ): Promise<LegalHistoryDocument> {
    const legalHistory = await this.lhModel.findOne({ region, uniqueId });

    return legalHistory;
  }
}
