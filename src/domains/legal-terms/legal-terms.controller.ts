import { Body, Controller, Get, Headers, Patch, Post } from '@nestjs/common';
import { CreateLegalTermsDTO } from './dto/createLegal-terms/legal-terms.create.dto';
import { LegalTermsDocument } from './schema/legal-terms.schema';
import { LegalTermsService } from './legal-terms.service';
import { UpdateLegalTermsDTO } from './dto/updateLegal-terms/legal-terms.update.dto';

@Controller('legal')
export class LegalTermsController {
  public constructor(public legaltermsServices: LegalTermsService) {}

  @Post('create')
  public async createLegalTerm(
    @Headers('region') region: string,
    @Body() body: CreateLegalTermsDTO,
  ): Promise<LegalTermsDocument> {
    return await this.legaltermsServices.createLegalTerm(region, body);
  }

  @Get('fetch')
  public async fetchLegalTerm(
    @Headers('region') region: string,
  ): Promise<LegalTermsDocument> {
    return await this.legaltermsServices.fetchLegalTerm(region);
  }

  @Patch('update')
  public async updateLegalTerm(
    @Headers('region') region: string,
    @Body() body: UpdateLegalTermsDTO,
  ): Promise<LegalTermsDocument> {
    return await this.legaltermsServices.updateLegalTerm(region, body);
  }

  @Patch('delete')
  public async deleteLegalTerm(
    @Headers('region') region: string,
  ): Promise<LegalTermsDocument> {
    return await this.legaltermsServices.deleteLegalTerm(region);
  }

  @Get('fetchall')
  public async fetchLegalTerms(
    @Headers('region') region: string,
  ): Promise<LegalTermsDocument[]> {
    return await this.legaltermsServices.fetchLegalTerms(region);
  }
}
