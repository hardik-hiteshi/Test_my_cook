import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AffiliateDocument } from './schema/affiliate.schema';
import { AffiliateService } from './affiliate.service';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateAffiliateDTO } from './dto/createDto/createAffiliate.dto';
import { Role } from '../auth/roles/permission.roles';
import { UpdateAffiliateDTO } from './dto/updateDto/updateAffiliate.dto';
@AUTH(Role.admin)
@Controller()
export class AffiliateController {
  public constructor(public affiliateServices: AffiliateService) {}

  @Post('affiliate')
  public async createAffiliate(
    @Body() body: CreateAffiliateDTO,
  ): Promise<AffiliateDocument> {
    return await this.affiliateServices.createAffiliate(body);
  }

  @Get('affiliate/:niceName')
  public async fetchAffiliate(
    @Param('niceName') niceName: string,
  ): Promise<AffiliateDocument> {
    return await this.affiliateServices.fetchAffiliate(niceName);
  }

  @Put('affiliate/:niceName')
  public async updateAffiliate(
    @Param('niceName') niceName: string,
    @Body() body: UpdateAffiliateDTO,
  ): Promise<AffiliateDocument> {
    return await this.affiliateServices.updateAffiliate(niceName, body);
  }

  @Delete('affiliate/:niceName')
  public async deleteAffiliate(
    @Param('niceName') niceName: string,
  ): Promise<object> {
    return await this.affiliateServices.deleteAffiliate(niceName);
  }

  @Get('affiliates')
  public async fetchAffiliates(
    @Query('search') search?: string,
  ): Promise<AffiliateDocument[]> {
    return await this.affiliateServices.fetchAffiliates(search);
  }
}
