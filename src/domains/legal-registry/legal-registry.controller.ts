import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { CreateLegalRegistryDTO } from './dto/createLegalRegistry.dto';
import { LegalRegistryDocument } from './schema/legal-registry.schema';
import { LegalRegistryService } from './legal-registry.service';

@Controller('legal-registry')
export class LegalRegistryController {
  public constructor(public legalRegServices: LegalRegistryService) {}
  @Post()
  public async createLegalRegistry(
    @Headers('region') region: string,
    @Body() body: CreateLegalRegistryDTO,
  ): Promise<LegalRegistryDocument> {
    return await this.legalRegServices.createLegalRegistry(region, body);
  }

  @Get(':uniqueId')
  public async fetchLegalRegistry(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<LegalRegistryDocument> {
    return await this.legalRegServices.fetchLegalRegistry(region, uniqueId);
  }

  @Get()
  public async fetchAllLegalRegistry(
    @Headers('region') region: string,
  ): Promise<LegalRegistryDocument[]> {
    return await this.legalRegServices.fetchAllLegalRegistry(region);
  }
}
