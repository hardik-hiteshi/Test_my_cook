import { Injectable, NotFoundException } from '@nestjs/common';
import { LegalHistoryDocument } from './schema/legal-history.schema';
import { LegalHistoryRepository } from './repository/legal-history.repository';

@Injectable()
export class LegalHistoryService {
  public notfound = 'Legal History not found';
  public constructor(public lhRepo: LegalHistoryRepository) {}

  public async fetchAllLH(region: string): Promise<LegalHistoryDocument[]> {
    const legalHistoryList = await this.lhRepo.fetchAllLH(region);
    if (legalHistoryList.length <= 0) {
      throw new NotFoundException(this.notfound);
    }

    return legalHistoryList;
  }

  public async fetchLH(
    region: string,
    uniqueId: string,
  ): Promise<LegalHistoryDocument> {
    const legalHistory = await this.lhRepo.fetchLH(region, uniqueId);
    if (!legalHistory) {
      throw new NotFoundException(this.notfound);
    }

    return legalHistory;
  }
}
