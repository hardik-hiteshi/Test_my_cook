import * as JSZip from 'jszip';
import * as xlsx from 'xlsx';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateMachineModelDto,
  CreateManyMachineModelDto,
  DeleteMachineModelDto,
  UpdateMachineModelDto,
} from './dtos';
import { json2csv } from 'json-2-csv';
import { MachineModelDocument } from './schema/machineModel.schema';
import { MachineModelRepository } from './repository/machineModel.repository';
import { v4 as uuid } from 'uuid';
@Injectable()
export class MachineModelService {
  public constructor(private machineModelRepo: MachineModelRepository) {}

  public async findAll(): Promise<MachineModelDocument[]> {
    const machineModel = await this.machineModelRepo.findAll({
      isActive: true,
    });

    if (machineModel.length <= 0)
      throw new NotFoundException('machine not found');

    return machineModel;
  }

  public async findOne(uniqueId: string): Promise<MachineModelDocument> {
    const machineModel = await this.machineModelRepo.findOne({
      isActive: true,
      uniqueId,
    });

    if (!machineModel) throw new NotFoundException('machine_model not found');

    return machineModel;
  }

  public async createOne(
    body: CreateMachineModelDto,
  ): Promise<MachineModelDocument> {
    const machineModel = await this.machineModelRepo.findOne({
      code: body.code,
      isActive: true,
    });

    if (machineModel)
      throw new BadRequestException('machine_model already exist');
    const data: CreateMachineModelDto & { uniqueId: string } = {
      ...body,
      uniqueId: uuid(),
    };

    const newmachineModel = await this.machineModelRepo.createOne(data);

    return newmachineModel;
  }

  public async deleteOne(body: DeleteMachineModelDto): Promise<void> {
    const machineModel = await this.machineModelRepo.deleteOne(body);
    if (!machineModel) throw new NotFoundException('machine_model not found');
  }
  public async createMany(body: CreateManyMachineModelDto): Promise<void> {
    const data = body.array.map((i) => i.code);
    const existingItems = await this.machineModelRepo.findAll({
      code: { $in: data },
    });

    const existingItemSerial = existingItems.map((item) => item.code);

    const filteredItems = body.array.filter(
      (item) => !existingItemSerial.includes(item.code),
    );

    if (filteredItems.length === 0) {
      throw new BadRequestException('All items already exist');
    }

    const itemsToInsert = filteredItems.map((item) => ({
      ...item,
      uniqueId: uuid(),
    }));

    await this.machineModelRepo.createMany(itemsToInsert);
  }
  public async findOneAndUpdate(
    uniqueId: string,
    body: UpdateMachineModelDto,
  ): Promise<MachineModelDocument> {
    if (body.code) {
      const machineModel = await this.machineModelRepo.findOne({
        code: body.code,
      });
      if (machineModel)
        throw new BadRequestException('code in given field is alaeady exist');
    }
    const machineModel = await this.machineModelRepo.findOneAndUpdate(
      { uniqueId },
      body,
    );

    if (!machineModel) throw new NotFoundException('machine_model not found');

    return machineModel;
  }

  public async exportFile(
    type: string,
  ): Promise<{ data: Buffer; type: string }> {
    type = type.toLocaleLowerCase();
    const machineModels = await this.machineModelRepo.findAll({
      isActive: true,
    });

    if (machineModels.length <= 0)
      throw new NotFoundException('machine_models not found');
    if (type === 'csv') {
      const csv = await json2csv(machineModels);
      const data = Buffer.from(csv);

      return { data, type };
    } else if (type === 'xlsx') {
      const ws = xlsx.utils.json_to_sheet(machineModels);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      const xlsxData = xlsx.write(wb, {
        bookType: 'xlsx',
        type: 'buffer',
      }) as Buffer;

      return { data: xlsxData, type };
    } else if (type === 'jsonzip') {
      const jsonFiles: Buffer[] = [];
      const zip = new JSZip();
      const zipFolder = zip.folder('json_data');
      for (const entry of machineModels) {
        const jsonData = JSON.stringify(entry, null, 2);
        jsonFiles.push(Buffer.from(jsonData));
      }

      for (let i = 0; i < jsonFiles.length; i++) {
        zipFolder.file(`data_${i}.json`, jsonFiles[i]);
      }

      const data = await zip.generateAsync({ type: 'nodebuffer' });

      return { data, type: 'zip' };
    } else if (type === 'json') {
      const data = Buffer.from(JSON.stringify(machineModels));

      return { data, type };
    }
    throw new BadRequestException('invalid data type');
  }
}
