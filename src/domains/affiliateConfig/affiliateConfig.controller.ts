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
import { AffiliateConfigDocument } from './schema/affiliateConfig.schema';
import { AffiliateConfigService } from './affiliateConfig.service';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateAffiliateConfigDTO } from './dto/createDto/createAffiliateConfig.dto';
import { Role } from '../auth/roles/permission.roles';
import { UpdateAffiliateConfigDTO } from './dto/updateDto/updateAffiliateConfig.dto';

@AUTH(Role.admin)
@Controller()
export class AffiliateConfigController {
  public constructor(public affiliateConfigServices: AffiliateConfigService) {}

  @Post('config')
  public async createAffiliateConfig(
    @Body() body: CreateAffiliateConfigDTO,
  ): Promise<AffiliateConfigDocument> {
    return await this.affiliateConfigServices.createAffiliateConfig(body);
  }

  @Get('config/:cookieName')
  public async fetchAffiliateConfig(
    @Param('cookieName') cookieName: string,
  ): Promise<AffiliateConfigDocument> {
    return await this.affiliateConfigServices.fetchAffiliateConfig(cookieName);
  }

  @Put('config/:cookieName')
  public async updateAffiliateConfig(
    @Param('cookieName') cookieName: string,
    @Body() body: UpdateAffiliateConfigDTO,
  ): Promise<AffiliateConfigDocument> {
    return await this.affiliateConfigServices.updateAffiliateConfig(
      cookieName,
      body,
    );
  }

  @Delete('config/:cookieName')
  public async deleteAffiliateConfig(
    @Param('cookieName') cookieName: string,
  ): Promise<object> {
    return await this.affiliateConfigServices.deleteAffiliateConfig(cookieName);
  }

  @Get('configs')
  public async fetchAffiliateConfigs(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<AffiliateConfigDocument[]> {
    return await this.affiliateConfigServices.fetchAffiliateConfigs(
      pageNumber,
      pageSize,
      search,
    );
  }
}
