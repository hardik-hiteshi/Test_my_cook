import { Controller, Get, Headers, Param } from '@nestjs/common';

import { LegalRegistryDocument } from '../schema/legal-registry.schema';
import { LegalRegistryService } from '../legal-registry.service';
@Controller('legalregistry')
export class LegalRegistryController {
  public constructor(public legalRegServices: LegalRegistryService) {}

  @Get(':uniqueId')
  public async fetchLegalRegistry(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<LegalRegistryDocument> {
    return await this.legalRegServices.fetchLegalRegistry(region, uniqueId);
  }
}
