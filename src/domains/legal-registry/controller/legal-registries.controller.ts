import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { AUTH } from '../../auth/decorator/auth.decorator';
import { CreateLegalRegistryDTO } from '../dto/createLegalRegistry.dto';
import { LegalRegistryDocument } from '../schema/legal-registry.schema';
import { LegalRegistryService } from '../legal-registry.service';
import { Role } from '../../auth/roles/permission.roles';
@AUTH(Role.admin)
@Controller()
export class LegalRegistriesController {
  public constructor(public legalRegServices: LegalRegistryService) {}

  @Get('legalregistries')
  public async fetchAllLegalRegistry(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<LegalRegistryDocument[]> {
    return await this.legalRegServices.fetchAllLegalRegistry(
      region,
      pageNumber,
      pageSize,
    );
  }

  @Post('legalregistry')
  public async createLegalRegistry(
    @Headers('region') region: string,

    @Body() body: CreateLegalRegistryDTO,
  ): Promise<LegalRegistryDocument> {
    return await this.legalRegServices.createLegalRegistry(region, body);
  }
}
