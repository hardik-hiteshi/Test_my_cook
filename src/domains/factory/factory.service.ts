import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFactoryDTO } from './dto/createfactory.dto';
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
    const factorylist = await this.factoryRepo.fetchFactory(region);
    if (factorylist.length <= 0)
      throw new NotFoundException('No Factory found');
    else {
      return factorylist;
    }
  }

  public async updateFactory(
    region: string,
    _id: string,
    body: UpdateFactoryDTO,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryRepo.updateFactory(region, _id, body);
    if (!factory) {
      throw new NotFoundException('Factory Does not exist.');
    }

    return factory;
  }

  public async deleteFactory(
    region: string,
    _id: string,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryRepo.deleteFactory(region, _id);
    if (!factory) {
      throw new NotFoundException('Factory Does not exist.');
    }

    return factory;
  }
}
