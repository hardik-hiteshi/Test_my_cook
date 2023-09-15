import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CreateLegalRegistryDTO } from '../dto/createLegalRegistry.dto';
import { LegalRegistryDocument } from '../schema/legal-registry.schema';
import { LegalRegistryService } from '../legal-registry.service';

@Controller('legalregistries')
export class LegalRegistriesController {
  public constructor(public legalRegServices: LegalRegistryService) {}
  @Get()
  public async fetchAllLegalRegistry(
    @Headers('region') region: string,
  ): Promise<LegalRegistryDocument[]> {
    return await this.legalRegServices.fetchAllLegalRegistry(region);
  }

  @Post()
  public async createLegalRegistry(
    @Headers('region') region: string,
    @Body() body: CreateLegalRegistryDTO,
  ): Promise<LegalRegistryDocument> {
    return await this.legalRegServices.createLegalRegistry(region, body);
  }
}
