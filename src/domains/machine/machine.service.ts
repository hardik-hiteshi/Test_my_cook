import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMachineDto, UpdateMachineDto } from './dtos';
import { MachineDocument } from './schema/machine.schema';
import { MachineRepository } from './repository/machine.repository';
import { v4 as uuid } from 'uuid';
@Injectable()
export class MachineService {
  public constructor(private machineRepo: MachineRepository) {}

  public async createOne(body: CreateMachineDto): Promise<MachineDocument> {
    const machine = await this.machineRepo.findOne({
      serial: { counter: body.serial.counter },
    });
    if (machine) throw new BadRequestException('machine already exist');
    body.uniqueId = uuid();

    return await this.machineRepo.createOne(body);
  }

  public async findOne(uniqueId: string): Promise<MachineDocument> {
    const machine = await this.machineRepo.findOne({
      uniqueId,
      isActive: true,
    });
    if (!machine) throw new NotFoundException('machine not found');

    return machine;
  }
  public async findAll(): Promise<MachineDocument[]> {
    const machine = await this.machineRepo.findAll({ isActive: true });
    if (machine.length <= 0) throw new NotFoundException('machine not found');

    return machine;
  }

  public async deleteOne(uniqueId: string): Promise<void> {
    const machine = await this.machineRepo.deleteOne({
      uniqueId,
      isActive: true,
    });
    if (!machine) throw new NotFoundException('machine not found');
  }

  public async findOneAndUpdate(
    uniqueId: string,
    body: UpdateMachineDto,
  ): Promise<MachineDocument> {
    const machine = await this.machineRepo.findOneAndUpdate(
      { uniqueId, isActive: true },
      body,
    );
    if (!machine) throw new NotFoundException('machine not found');

    return machine;
  }

  // async createMany(body) {}
}
