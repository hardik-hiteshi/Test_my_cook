import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMachineDto, UpdateMachineDto } from '../dtos';
import { Machine, MachineDocument } from '../schema/machine.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

@Injectable()
export class MachineRepository {
  public constructor(
    @InjectModel(Machine.name) private machineModel: Model<Machine>,
  ) {}

  public async createOne(body: CreateMachineDto): Promise<MachineDocument> {
    return await this.machineModel.create(body);
  }

  public async findOne(
    query: RecursivePartial<Machine>,
  ): Promise<MachineDocument> {
    return await this.machineModel.findOne(query);
  }

  public async findAll(
    query: RecursivePartial<Machine>,
  ): Promise<MachineDocument[]> {
    return await this.machineModel.find(query);
  }

  public async deleteOne(
    query: RecursivePartial<Machine>,
  ): Promise<MachineDocument> {
    return await this.machineModel.findOneAndUpdate(query, { isActive: false });
  }

  public async findOneAndUpdate(
    query: RecursivePartial<Machine>,
    body: UpdateMachineDto,
  ): Promise<MachineDocument> {
    if (Object.keys(body).length === 0)
      throw new BadRequestException('request body can not be empty');

    return await this.machineModel.findOneAndUpdate(
      query,
      { $set: body },
      {
        new: true,
      },
    );
  }
}
