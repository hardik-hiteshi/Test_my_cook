import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Put,
} from '@nestjs/common';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateLegalTermsDTO } from './dto/createLegal-terms/legal-terms.create.dto';
import { LegalTermsDocument } from './schema/legal-terms.schema';
import { LegalTermsService } from './legal-terms.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateLegalTermsDTO } from './dto/updateLegal-terms/legal-terms.update.dto';

@AUTH(Role.admin)
@Controller()
export class LegalTermsController {
  public constructor(public legaltermsServices: LegalTermsService) {}

  @Post('legalterms')
  public async createLegalTerm(
    @Headers('region') region: string,
    @Body() body: CreateLegalTermsDTO,
  ): Promise<LegalTermsDocument> {
    return await this.legaltermsServices.createLegalTerm(region, body);
  }

  @Get('legalterms')
  public async fetchLegalTerm(
    @Headers('region') region: string,
  ): Promise<LegalTermsDocument> {
    return await this.legaltermsServices.fetchLegalTerm(region);
  }

  @Put('legalterms')
  public async updateLegalTerm(
    @Headers('region') region: string,
    @Body() body: UpdateLegalTermsDTO,
  ): Promise<LegalTermsDocument> {
    return await this.legaltermsServices.updateLegalTerm(region, body);
  }

  @Delete('legalterms')
  public async deleteLegalTerm(
    @Headers('region') region: string,
  ): Promise<object> {
    return await this.legaltermsServices.deleteLegalTerm(region);
  }

  @Get('legaltermss')
  public async fetchLegalTerms(
    @Headers('region') region: string,
  ): Promise<LegalTermsDocument[]> {
    return await this.legaltermsServices.fetchLegalTerms(region);
  }
}
