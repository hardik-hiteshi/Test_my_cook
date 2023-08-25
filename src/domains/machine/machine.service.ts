import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateMachineDto,
  CreateManyMachineDto,
  UpdateMachineDto,
} from './dtos';
import { IItemsToInsert } from './interface/createManyMachine.interface';
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

  public async createMany(
    body: CreateManyMachineDto,
  ): Promise<MachineDocument[]> {
    const data = body.array.map((i) => i.serial);
    const existingItems = await this.machineRepo.findAll({
      serial: { $in: data },
    });

    const existingItemSerial = existingItems.map((item) => item.serial.counter);

    const itemsToInsert: IItemsToInsert[] = body.array.filter(
      (item) => !existingItemSerial.includes(item.serial.counter),
    );

    if (itemsToInsert.length === 0) {
      throw new BadRequestException('All items already exist');
    }
    for (const obj of itemsToInsert) {
      obj.uniqueId = uuid();
    }
    const machine = await this.machineRepo.createMany(itemsToInsert);

    return machine;
  }
}
