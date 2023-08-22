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

  public async createFactory(body: CreateFactoryDTO): Promise<FactoryDocument> {
    const factory = await this.factoryRepo.findOne(body);
    if (!factory) {
      const factory = await this.factoryRepo.createFactory(body);

      return factory;
    }
    throw new BadRequestException('Factory already exists.');
  }

  public async find(): Promise<FactoryDocument[]> {
    const factorylist = await this.factoryRepo.find();
    if (factorylist.length <= 0)
      throw new NotFoundException('No Factory found');
    else {
      return factorylist;
    }
  }

  public async updateFactory(
    _id: string,
    body: UpdateFactoryDTO,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryRepo.updateFactory(_id, body);
    if (!factory) {
      throw new NotFoundException('Factory Does not exist.');
    }

    return factory;
  }

  public async deleteFactory(_id: string): Promise<FactoryDocument> {
    const factory = await this.factoryRepo.deleteFactory(_id);
    if (!factory) {
      throw new NotFoundException('Factory Does not exist.');
    }

    return factory;
  }
}
