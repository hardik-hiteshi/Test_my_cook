import {
  CreateMachineLogDto,
  CreateManyMachineLogDTO,
  UpdateMachineLogDto,
} from '../dtos';
import { MachineLog, MachineLogDocument } from '../schema/machine-log.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MachineLogRepository {
  public constructor(
    @InjectModel(MachineLog.name) private machineLogModel: Model<MachineLog>,
  ) {}

  public async createOne(
    region: string,
    body: CreateMachineLogDto,
    uniqueId: string,
  ): Promise<MachineLogDocument> {
    return await this.machineLogModel.create({ ...body, uniqueId, region });
  }

  public async findOne(
    uniqueId: string,
    region: string,
  ): Promise<MachineLogDocument> {
    return await this.machineLogModel.findOne({
      uniqueId,
      isActive: true,
      region,
    });
  }

  public async findAll(
    region: string,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<MachineLogDocument[]> {
    const skipAmount = (pageNumber - 1) * pageSize;

    return await this.machineLogModel
      .find({ region, isActive: true })
      .skip(skipAmount)
      .limit(pageSize)
      .lean();
  }

  public async deleteOne(
    region: string,
    uniqueId: string,
  ): Promise<MachineLogDocument> {
    return await this.machineLogModel.findOneAndUpdate(
      {
        uniqueId,
        region,
        isActive: true,
      },
      { isActive: false },
      { new: true },
    );
  }

  public async updateOne(
    region: string,
    uniqueId: string,
    body: UpdateMachineLogDto,
  ): Promise<MachineLogDocument> {
    return await this.machineLogModel.findOneAndUpdate(
      {
        region,
        uniqueId,
        isActive: true,
      },
      body,
      { new: true },
    );
  }

  public async createManyMachineLogs(
    body: CreateManyMachineLogDTO,
  ): Promise<MachineLogDocument[]> {
    return (await this.machineLogModel.insertMany(
      body.data,
    )) as MachineLogDocument[];
  }
}
