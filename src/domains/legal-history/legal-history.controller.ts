import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { AUTH } from '../auth/decorator/auth.decorator';
import { LegalHistoryDocument } from './schema/legal-history.schema';
import { LegalHistoryService } from './legal-history.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
export class LegalHistoryController {
  public constructor(public lhServices: LegalHistoryService) {}

  @Get('legalhistory/:uniqueId')
  public async fetchLH(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<LegalHistoryDocument> {
    return await this.lhServices.fetchLH(region, uniqueId);
  }

  @Get('legalhistorys')
  public async fetchAllLH(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<Partial<LegalHistoryDocument>[]> {
    return await this.lhServices.fetchAllLH(region, pageNumber, pageSize);
  }
}
