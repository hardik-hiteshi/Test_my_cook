import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { AUTH } from 'src/domains/auth/decorator/auth.decorator';
import { CreateManyMachineLogDTO } from '../dtos/index';
import { MachineLogDocument } from '../schema/machine-log.schema';
import { MachineLogService } from '../machine-log.service';
import { Response } from 'express';
import { Role } from 'src/domains/auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller('machinelogs')
export class MachineLogsController {
  public constructor(public machineLogService: MachineLogService) {}

  @Post()
  public async createManyMachineLogs(
    @Body() body: CreateManyMachineLogDTO,
  ): Promise<MachineLogDocument[]> {
    return await this.machineLogService.createManyMachineLogs(body);
  }

  @Get('export-to-csv')
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

  @Get()
  private async getAllMachineLog(
    @Headers('region') region: string,
  ): Promise<MachineLogDocument[]> {
    return await this.machineLogService.findAll(region);
  }
}
