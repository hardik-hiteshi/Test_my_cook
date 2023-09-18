import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CreateManyFactoriesDTO } from '../dto/createManyFactories.dto';
import { FactoryDocument } from '../schema/factory.schema';
import { FactoryService } from '../factory.service';

@Controller('factories')
export class FactoriesController {
  public constructor(public factoryServices: FactoryService) {}

  @Get()
  public async findAll(
    @Headers('region') region: string,
  ): Promise<FactoryDocument[]> {
    return await this.factoryServices.find(region);
  }
  //is not speficied right now
  // @Post()
  // public async createManyFactories(
  //   @Headers('region') region: string,
  //   @Body() body: CreateManyFactoriesDTO,
  // ): Promise<FactoryDocument[]> {
  //   return await this.factoryServices.createManyFactories(region, body);
  // }
}
