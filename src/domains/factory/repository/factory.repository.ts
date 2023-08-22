import { Factory, FactoryDocument } from '../schema/factory.schema';
import { CreateFactoryDTO } from '../dto/createfactory.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateFactoryDTO } from '../dto/updatefactory.dto';

@Injectable()
export class FactoryRepository {
  public constructor(
    @InjectModel(Factory.name) public factoryModel: Model<Factory>,
  ) {}

  public async findOne(body: CreateFactoryDTO): Promise<FactoryDocument> {
    const factory = await this.factoryModel.findOne(body);

    return factory;
  }

  public async createFactory(body: CreateFactoryDTO): Promise<FactoryDocument> {
    const factory = await this.factoryModel.create(body);

    return factory;
  }
  public async find(): Promise<FactoryDocument[]> {
    const factories = await this.factoryModel.find({ isActive: true });

    return factories;
  }

  public async updateFactory(
    _id: string,
    body: UpdateFactoryDTO,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryModel.findOneAndUpdate(
      { _id, isActive: true },
      body,
      {
        new: true,
      },
    );

    return factory;
  }

  public async deleteFactory(_id: string): Promise<FactoryDocument> {
    const factory = await this.factoryModel.findOneAndUpdate(
      { _id, isActive: true },
      { isActive: false },
      {
        new: true,
      },
    );

    return factory;
  }
}
