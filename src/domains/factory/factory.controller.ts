import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFactoryDTO } from './dto/createfactory.dto';
import { FactoryDocument } from './schema/factory.schema';
import { FactoryService } from './factory.service';
import { UpdateFactoryDTO } from './dto/updatefactory.dto';

@Controller('factory')
export class FactoryController {
  public constructor(public factoryServices: FactoryService) {}

  @Post()
  public async createFactory(
    @Headers('region') region: string,
    @Body() body: CreateFactoryDTO,
  ): Promise<FactoryDocument> {
    return await this.factoryServices.createFactory(region, body);
  }

  @Get()
  public async findAll(
    @Headers('region') region: string,
  ): Promise<FactoryDocument[]> {
    return await this.factoryServices.find(region);
  }

  @Patch(':uniqueId')
  public async updateFactory(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateFactoryDTO,
  ): Promise<FactoryDocument> {
    return await this.factoryServices.updateFactory(region, uniqueId, body);
  }

  @Delete(':uniqueId')
  public async deleteFactory(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<FactoryDocument> {
    return await this.factoryServices.deleteFactory(region, uniqueId);
  }
}
