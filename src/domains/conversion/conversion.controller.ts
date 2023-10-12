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
import { AUTH } from '../auth/decorator/auth.decorator';
import { ConversionDocument } from './schema/conversion.schema';
import { ConversionService } from './conversion.service';
import { CreateConversionDTO } from './dto/createDto/create.conversion.dto';
import { Role } from '../auth/roles/permission.roles';
import { UpdateConversionDTO } from './dto/updateDto/update.conversion.dto';

@AUTH(Role.admin)
@Controller()
export class ConversionController {
  public constructor(public conversionServices: ConversionService) {}

  @Post('conversion')
  public async createConversion(
    @Body() body: CreateConversionDTO,
  ): Promise<ConversionDocument> {
    return await this.conversionServices.createConversion(body);
  }

  @Get('conversion/:uniqueId')
  public async fetchConversion(
    @Param('uniqueId') uniqueId: string,
  ): Promise<ConversionDocument> {
    return await this.conversionServices.fetchConversion(uniqueId);
  }

  @Put('conversion/:uniqueId')
  public async updateConversion(
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateConversionDTO,
  ): Promise<ConversionDocument> {
    return await this.conversionServices.updateConversion(uniqueId, body);
  }

  @Delete('conversion/:uniqueId')
  public async deleteConversion(
    @Param('uniqueId') uniqueId: string,
  ): Promise<object> {
    return await this.conversionServices.deleteConversion(uniqueId);
  }

  @Get('conversions')
  public async fetchConversions(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<ConversionDocument[]> {
    return await this.conversionServices.fetchConversions(
      pageNumber,
      pageSize,
      search,
    );
  }
}
