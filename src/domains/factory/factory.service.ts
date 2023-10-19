import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFactoryDTO } from './dto/createfactory.dto';
// import { CreateManyFactoriesDTO } from './dto/createManyFactories.dto';
import { FactoryDocument } from './schema/factory.schema';
import { FactoryRepository } from './repository/factory.repository';
import { UpdateFactoryDTO } from './dto/updatefactory.dto';

@Injectable()
export class FactoryService {
  public constructor(public factoryRepo: FactoryRepository) {}

  public async createFactory(
    region: string,
    body: CreateFactoryDTO,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryRepo.findOne(region, body);
    if (!factory) {
      const factory = await this.factoryRepo.createFactory(region, body);

      return factory;
    }
    throw new BadRequestException('Factory already exists.');
  }

  public async find(region: string): Promise<FactoryDocument[]> {
    const factorylist = await this.factoryRepo.fetchFactories(region);
    if (factorylist.length > 0) {
      return factorylist;
    }
    // throw new NotFoundException('No Factory found');

    return [];
  }

  public async updateFactory(
    region: string,
    uniqueId: string,
    body: UpdateFactoryDTO,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryRepo.updateFactory(
      region,
      uniqueId,
      body,
    );
    if (!factory) {
      throw new NotFoundException('Factory Does not exist.');
    }

    return factory;
  }

  public async deleteFactory(
    region: string,
    uniqueId: string,
  ): Promise<object> {
    const factory = await this.factoryRepo.deleteFactory(region, uniqueId);
    if (!factory) {
      throw new NotFoundException('Factory Does not exist.');
    }

    return { message: 'Deleted Success' };
  }

  public async findFactory(
    region: string,
    uniqueId: string,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryRepo.fetchFactory(region, uniqueId);
    if (!factory) {
      throw new NotFoundException('Factory not found.');
    }

    return factory;
  }

  // public async createManyFactories(
  //   region: string,
  //   body: CreateManyFactoriesDTO,
  // ): Promise<FactoryDocument[]> {
  // return await this.factoryRepo.createManyFactories(region, body);
  //   const filterData = [];
  //   const data = body.data;
  // const data = body.data.map((i) => if(!i.uniqueId){filterData.push(i.uniqeId));
  // const existingItems = await this.factoryRepo.findAll({
  //   uniqeId: { $in: data },
  // });

  // const existingItemSerial = existingItems.map((item) => [
  //   item.niceName,
  //   item.region,
  // ]);

  // const itemsToInsert = body.data.filter(
  //   (item) =>    !existingItemSerial.some(
  //       (i) => i[0] == item.niceName && i[1] == item.region,
  //     ),
  // );

  // if (itemsToInsert.length === 0) {
  //   throw new BadRequestException('All items already exist');
  // }

  // return await this.dietRepo.createManyDiet(itemsToInsert);
  //   return [];
  // }

  public async fetchFactoryMachineType(
    region: string,
    uniqueId: string,
  ): Promise<Partial<FactoryDocument>> {
    const machineType = await this.factoryRepo.fetchFactoryMachineType(
      region,
      uniqueId,
    );
    if (!machineType) {
      throw new NotFoundException('Machine type not found.');
    }

    return machineType;
  }
}
