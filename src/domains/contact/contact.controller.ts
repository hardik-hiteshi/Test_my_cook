import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateContactDto, UpdateContactDto } from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { ContactDocument } from './schema/contact.schema';
import { ContactService } from './contact.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
export class ContactController {
  public constructor(private contactService: ContactService) {}

  @Post('contact')
  private async createContact(
    @Headers('region') region: string,
    @Body() body: CreateContactDto,
  ): Promise<ContactDocument> {
    return await this.contactService.createOne(region, body);
  }

  @Put('contact/:nicename')
  private async updateContact(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
    @Body() body: UpdateContactDto,
  ): Promise<ContactDocument> {
    return await this.contactService.updateOne(region, niceName, body);
  }

  @Delete('contact/:nicename')
  private async deleteContact(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<object> {
    return await this.contactService.deleteOne(niceName, region);
  }

  @Get('contact/:nicename')
  private async getContact(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<ContactDocument> {
    return await this.contactService.findOne(niceName, region);
  }
  @Get('contacts')
  private async getAllContact(
    @Headers('region') region: string,
  ): Promise<ContactDocument[]> {
    return await this.contactService.findAll(region);
  }
}
