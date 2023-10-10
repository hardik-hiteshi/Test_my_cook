import { Controller, Get, Headers, Param } from '@nestjs/common';
import { AUTH } from '../../auth/decorator/auth.decorator';
import { LegalRegistryDocument } from '../schema/legal-registry.schema';
import { LegalRegistryService } from '../legal-registry.service';
import { Role } from '../../auth/roles/permission.roles';

@AUTH(Role.admin)
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
