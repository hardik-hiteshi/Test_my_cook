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
import { AUTH } from '../../auth/decorator/auth.decorator';
import { CreateFactoryDTO } from '../dto/createfactory.dto';
import { FactoryDocument } from '../schema/factory.schema';
import { FactoryService } from '../factory.service';
import { Role } from '../../auth/roles/permission.roles';
import { UpdateFactoryDTO } from '../dto/updatefactory.dto';
@AUTH(Role.admin)
@Controller('factory')
export class FactoryController {
  public constructor(private factoryServices: FactoryService) {}

  @Post()
  private async createFactory(
    @Headers('region') region: string,
    @Body() body: CreateFactoryDTO,
  ): Promise<FactoryDocument> {
    return await this.factoryServices.createFactory(region, body);
  }

  @Get(':uniqueId')
  private async findAll(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<FactoryDocument> {
    return await this.factoryServices.findFactory(region, uniqueId);
  }

  @Put(':uniqueId')
  private async updateFactory(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateFactoryDTO,
  ): Promise<FactoryDocument> {
    return await this.factoryServices.updateFactory(region, uniqueId, body);
  }

  @Delete(':uniqueId')
  private async deleteFactory(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<object> {
    return await this.factoryServices.deleteFactory(region, uniqueId);
  }

  @Get(':uniqueId/machineType')
  private async fetchFactoryMachineType(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<Partial<FactoryDocument>> {
    return await this.factoryServices.fetchFactoryMachineType(region, uniqueId);
  }
}
