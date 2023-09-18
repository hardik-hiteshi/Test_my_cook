import {
  CreateMachineLogDto,
  CreateManyMachineLogDTO,
  UpdateMachineLogDto,
} from './dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { json2csv } from 'json-2-csv';
import { MachineLogDocument } from './schema/machine-log.schema';
import { MachineLogRepository } from './repository/machine-log.repository';
import { v4 as uuid } from 'uuid';
@Injectable()
export class MachineLogService {
  public machinelogNotfound = 'machine_log not found';
  public constructor(private machineLogRepo: MachineLogRepository) {}

  public async createOne(
    body: CreateMachineLogDto,
    region: string,
  ): Promise<MachineLogDocument> {
    const uniqueId = uuid();

    return await this.machineLogRepo.createOne(region, body, uniqueId);
  }

  public async findOne(
    uniqueId: string,
    region: string,
  ): Promise<MachineLogDocument> {
    const machineLog = await this.machineLogRepo.findOne(uniqueId, region);

    if (!machineLog) throw new NotFoundException(this.machinelogNotfound);

    return machineLog;
  }

  public async findAll(region: string): Promise<MachineLogDocument[]> {
    const machineLog = await this.machineLogRepo.findAll(region);

    if (machineLog.length <= 0)
      throw new NotFoundException(this.machinelogNotfound);

    return machineLog;
  }

  public async deleteOne(region: string, uniqueId: string): Promise<void> {
    const machineLog = await this.machineLogRepo.deleteOne(region, uniqueId);

    if (!machineLog) throw new NotFoundException(this.machinelogNotfound);
  }

  public async updateOne(
    region: string,
    uniqueId: string,
    body: UpdateMachineLogDto,
  ): Promise<MachineLogDocument> {
    const machineLog = await this.machineLogRepo.updateOne(
      region,
      uniqueId,
      body,
    );

    if (!machineLog) throw new NotFoundException(this.machinelogNotfound);

    return machineLog;
  }

  public async createManyMachineLogs(
    body: CreateManyMachineLogDTO,
  ): Promise<MachineLogDocument[]> {
    for (let i = 0; i < body.data.length; i++) {
      // console.log(i)
      body.data[i]['uniqueId'] = uuid();
    }
    const bulkData = await this.machineLogRepo.createManyMachineLogs(body);
    if (bulkData.length <= 0) {
      throw new NotFoundException('Data not inserted.');
    }

    return bulkData;
  }

  public async exportToCSV(region: string): Promise<Buffer> {
    const machineLogs = await this.machineLogRepo.findAll(region);

    if (machineLogs.length <= 0) {
      throw new NotFoundException('machine_models not found');
    }
    // console.log(machineLogs);
    const csv = await json2csv(machineLogs, { unwindArrays: true });
    const data = Buffer.from(csv);

    return data;
  }
}
