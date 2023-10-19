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
import { SerialDto } from './dtos/createManyMachine/subDto/serial.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MachineService {
  public constructor(private machineRepo: MachineRepository) {}

  public async createOne(
    body: CreateMachineDto,
    region: string,
  ): Promise<MachineDocument> {
    const machine = await this.machineRepo.findOne({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'serial.counter': body.serial.counter,
    });

    if (machine) {
      throw new BadRequestException('machine serial counter already exist');
    }
    body.uniqueId = uuid();

    return await this.machineRepo.createOne(body, region);
  }

  public async findOne(
    uniqueId: string,
    region: string,
  ): Promise<MachineDocument> {
    const machine = await this.machineRepo.findOne({
      uniqueId,
      region,
    });
    if (!machine) throw new NotFoundException('machine not found');

    return machine;
  }
  public async findAll(region: string): Promise<MachineDocument[]> {
    const machine = await this.machineRepo.findAll({ region });
    if (machine.length > 0) {
      return machine;
    }
    // throw new NotFoundException('machine not found');

    return [];
  }

  public async deleteOne(uniqueId: string): Promise<object> {
    const machine = await this.machineRepo.deleteOne({
      uniqueId,
    });
    if (!machine) throw new NotFoundException('machine not found');

    return { message: 'Deleted Success' };
  }

  public async findOneAndUpdate(
    uniqueId: string,
    body: UpdateMachineDto,
  ): Promise<MachineDocument> {
    // if (body.serial?.counter) {
    //   const machine = await this.machineRepo.findOne({
    //     // eslint-disable-next-line @typescript-eslint/naming-convention
    //     'serial.counter': body.serial.counter,
    //   });
    //   if (machine)
    //     throw new BadRequestException('serial.counter is already exist');
    // }
    const machine = await this.machineRepo.findOneAndUpdate({ uniqueId }, body);

    if (!machine) throw new NotFoundException('machine not found');

    return machine;
  }

  public async createMany(
    body: CreateManyMachineDto,
    region: string,
  ): Promise<MachineDocument[]> {
    const data = body.array.map((i) => i.serial);
    const existingItems = await this.machineRepo.findAll({
      serial: { $in: data },
    });

    const existingItemSerial = existingItems.map((item) => item.serial.counter);

    const items: Partial<SerialDto>[] = body.array.filter(
      (item) => !existingItemSerial.includes(item.serial.counter),
    );

    if (items.length === 0) {
      throw new BadRequestException('All items already exist');
    }
    // for (const obj of itemsToInsert) {
    //   obj.region = region;
    //   obj.uniqueId = uuid();
    // }

    const itemsToInsert: IItemsToInsert[] = items.map((item) => ({
      ...item,
      region,
      uniqueId: uuid(),
    }));
    const machine = await this.machineRepo.createMany(itemsToInsert);

    return machine;
  }
}
