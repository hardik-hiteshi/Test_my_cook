import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { CreateFactoryDTO } from './dto/createfactory.dto';
import { FactoryDocument } from './schema/factory.schema';
import { FactoryService } from './factory.service';
import { UpdateFactoryDTO } from './dto/updatefactory.dto';

@Controller('factory')
export class FactoryController {
  public constructor(public factoryServices: FactoryService) {}

  @Post('create')
  public async createFactory(
    @Body() body: CreateFactoryDTO,
  ): Promise<FactoryDocument> {
    return await this.factoryServices.createFactory(body);
  }

  @Get('fetchall')
  public async findAll(): Promise<FactoryDocument[]> {
    return await this.factoryServices.find();
  }

  @Patch('update')
  public async updateFactory(
    @Query('_id') _id: string,
    @Body() body: UpdateFactoryDTO,
  ): Promise<FactoryDocument> {
    return await this.factoryServices.updateFactory(_id, body);
  }

  @Patch('delete')
  public async deleteFactory(
    @Query('_id') _id: string,
  ): Promise<FactoryDocument> {
    return await this.factoryServices.deleteFactory(_id);
  }
}
