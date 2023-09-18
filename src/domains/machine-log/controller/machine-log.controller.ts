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

import { AUTH } from 'src/domains/auth/decorator/auth.decorator';
import { CreateMachineLogDto } from '../dtos/create-machine-log.dto';
import { MachineLogDocument } from '../schema/machine-log.schema';
import { MachineLogService } from '../machine-log.service';
import { Role } from 'src/domains/auth/roles/permission.roles';
import { UpdateMachineLogDto } from '../dtos/update-machine-log.dto';

@AUTH(Role.admin)
@Controller('machine-log')
export class MachineLogController {
  public constructor(private machineLogService: MachineLogService) {}

  @Post()
  private async createMachineLog(
    @Headers('region') region: string,
    @Body() body: CreateMachineLogDto,
  ): Promise<MachineLogDocument> {
    return await this.machineLogService.createOne(body, region);
  }

  @Get(':uniqueId')
  private async getMachineLog(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<MachineLogDocument> {
    return await this.machineLogService.findOne(uniqueId, region);
  }

  @Get()
  private async getAllMachineLog(
    @Headers('region') region: string,
  ): Promise<MachineLogDocument[]> {
    return await this.machineLogService.findAll(region);
  }

  @Delete(':uniqueId')
  private async deleteMachineLog(
    @Param('uniqueId') uniqueId: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.machineLogService.deleteOne(region, uniqueId);
  }

  @Put(':uniqueId')
  private async updateMachineLog(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateMachineLogDto,
  ): Promise<MachineLogDocument> {
    return await this.machineLogService.updateOne(region, uniqueId, body);
  }
}
