import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';

import { AUTH } from 'src/domains/auth/decorator/auth.decorator';
import { CreateMachineLogDto } from '../dtos/create-machine-log.dto';
import { CreateManyMachineLogDTO } from '../dtos/createMany-machine-logs.dto';
import { MachineLogDocument } from '../schema/machine-log.schema';
import { MachineLogService } from '../machine-log.service';
import { Response } from 'express';
import { Role } from 'src/domains/auth/roles/permission.roles';
import { UpdateMachineLogDto } from '../dtos/update-machine-log.dto';

@AUTH(Role.admin)
@Controller()
export class MachineLogController {
  public constructor(private machineLogService: MachineLogService) {}

  @Post('machinelog')
  private async createMachineLog(
    @Headers('region') region: string,
    @Body() body: CreateMachineLogDto,
  ): Promise<MachineLogDocument> {
    return await this.machineLogService.createOne(body, region);
  }

  @Get('machinelog/:uniqueId')
  private async getMachineLog(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<MachineLogDocument> {
    return await this.machineLogService.findOne(uniqueId, region);
  }

  @Delete('machinelog/:uniqueId')
  private async deleteMachineLog(
    @Param('uniqueId') uniqueId: string,
    @Headers('region') region: string,
  ): Promise<object> {
    return await this.machineLogService.deleteOne(region, uniqueId);
  }

  @Put('machinelog/:uniqueId')
  private async updateMachineLog(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateMachineLogDto,
  ): Promise<MachineLogDocument> {
    return await this.machineLogService.updateOne(region, uniqueId, body);
  }

  @Post('machinelogs')
  private async createManyMachineLogs(
    @Body() body: CreateManyMachineLogDTO,
  ): Promise<MachineLogDocument[]> {
    return await this.machineLogService.createManyMachineLogs(body);
  }

  @Get('machinelogs/export-to-csv')
  private async exportToCSV(
    @Headers('region') region: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.machineLogService.exportToCSV('MACHINE');
    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/.csv`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=MachineLogs.csv`,
    });

    return new StreamableFile(file);
  }

  @Get('machinelogs')
  private async getAllMachineLog(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<MachineLogDocument[]> {
    return await this.machineLogService.findAll(region, pageNumber, pageSize);
  }

  // @Get()
  // private async getAllMachineLog(
  //   @Headers('region') region: string,
  // ): Promise<MachineLogDocument[]> {
  //   return await this.machineLogService.findAll(region);
  // }
}
