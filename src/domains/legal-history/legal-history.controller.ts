import { Controller, Get, Headers, Param } from '@nestjs/common';

import { LegalHistoryDocument } from './schema/legal-history.schema';
import { LegalHistoryService } from './legal-history.service';
@Controller('legal-history')
export class LegalHistoryController {
  public constructor(public lhServices: LegalHistoryService) {}

  @Get(':uniqueId')
  public async fetchLH(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<LegalHistoryDocument> {
    return await this.lhServices.fetchLH(region, uniqueId);
  }
  @Get()
  public async fetchAllLH(
    @Headers('region') region: string,
  ): Promise<LegalHistoryDocument[]> {
    return await this.lhServices.fetchAllLH(region);
  }
}
