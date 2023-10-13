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
import { AffiliateContactDocument } from './schema/affiliateContact.schema';
import { AffiliateContactService } from './affiliateContact.service';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateAffiliateContactDTO } from './dto/createDto/createAffiliateContact.dto';
import { Role } from '../auth/roles/permission.roles';
import { UpdateAffiliateContactDTO } from './dto/updateDto/updateAffiliateContact.dto';

@AUTH(Role.admin)
@Controller()
export class AffiliateContactController {
  public constructor(
    public affiliateContactServices: AffiliateContactService,
  ) {}

  @Post('affiliatecontact')
  public async createAffiliateContact(
    @Body() body: CreateAffiliateContactDTO,
  ): Promise<AffiliateContactDocument> {
    return await this.affiliateContactServices.createAffiliateContact(body);
  }

  @Get('affiliatecontact/:uniqueId')
  public async fetchAffiliateContact(
    @Param('uniqueId') uniqueId: string,
  ): Promise<AffiliateContactDocument> {
    return await this.affiliateContactServices.fetchAffiliateContact(uniqueId);
  }

  @Put('affiliatecontact/:uniqueId')
  public async updateAffiliateContact(
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateAffiliateContactDTO,
  ): Promise<AffiliateContactDocument> {
    return await this.affiliateContactServices.updateAffiliateContact(
      uniqueId,
      body,
    );
  }

  @Delete('affiliatecontact/:uniqueId')
  public async deleteAffiliateContact(
    @Param('uniqueId') uniqueId: string,
  ): Promise<object> {
    return await this.affiliateContactServices.deleteAffiliateContact(uniqueId);
  }

  @Get('affiliatecontacts')
  public async fetchAffiliateContacts(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<AffiliateContactDocument[]> {
    return await this.affiliateContactServices.fetchAffiliateContacts(
      pageNumber,
      pageSize,
      search,
    );
  }
}
