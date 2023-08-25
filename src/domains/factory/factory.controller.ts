import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateFactoryDTO } from './dto/createfactory.dto';
import { FactoryDocument } from './schema/factory.schema';
import { FactoryService } from './factory.service';
import { UpdateFactoryDTO } from './dto/updatefactory.dto';

@Controller('factory')
export class FactoryController {
  public constructor(public factoryServices: FactoryService) {}

  @Post('create')
  public async createFactory(
    @Headers('region') region: string,
    @Body() body: CreateFactoryDTO,
  ): Promise<FactoryDocument> {
    return await this.factoryServices.createFactory(region, body);
  }

  @Get('fetchall')
  public async findAll(
    @Headers('region') region: string,
  ): Promise<FactoryDocument[]> {
    return await this.factoryServices.find(region);
  }

  @Patch('update')
  public async updateFactory(
    @Headers('region') region: string,
    @Query('_id') _id: string,
    @Body() body: UpdateFactoryDTO,
  ): Promise<FactoryDocument> {
    return await this.factoryServices.updateFactory(region, _id, body);
  }

  @Patch('delete')
  public async deleteFactory(
    @Headers('region') region: string,
    @Query('_id') _id: string,
  ): Promise<FactoryDocument> {
    return await this.factoryServices.deleteFactory(region, _id);
  }
}
