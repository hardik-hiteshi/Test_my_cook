import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateLegalTermsDTO } from './dto/createLegal-terms/legal-terms.create.dto';
import { LegalTermsDocument } from './schema/legal-terms.schema';
import { LegalTermsService } from './legal-terms.service';
import { UpdateLegalTermsDTO } from './dto/updateLegal-terms/legal-terms.update.dto';

@Controller('legalterms')
export class LegalTermsController {
  public constructor(public legaltermsServices: LegalTermsService) {}

  @Post()
  public async createLegalTerm(
    @Headers('region') region: string,
    @Body() body: CreateLegalTermsDTO,
  ): Promise<LegalTermsDocument> {
    return await this.legaltermsServices.createLegalTerm(region, body);
  }

  @Get()
  public async fetchLegalTerm(
    @Headers('region') region: string,
  ): Promise<LegalTermsDocument> {
    return await this.legaltermsServices.fetchLegalTerm(region);
  }

  @Patch()
  public async updateLegalTerm(
    @Headers('region') region: string,
    @Body() body: UpdateLegalTermsDTO,
  ): Promise<LegalTermsDocument> {
    return await this.legaltermsServices.updateLegalTerm(region, body);
  }

  @Delete()
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
