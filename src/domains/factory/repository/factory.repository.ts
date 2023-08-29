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

  public async findOne(
    region: string,
    body: CreateFactoryDTO,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryModel.findOne({ ...body, region });

    return factory;
  }

  public async createFactory(
    region: string,
    body: CreateFactoryDTO,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryModel.create({ ...body, region });

    return factory;
  }
  public async fetchFactory(region: string): Promise<FactoryDocument[]> {
    const factories = await this.factoryModel.find({ region, isActive: true });

    return factories;
  }

  public async updateFactory(
    region: string,
    _id: string,
    body: UpdateFactoryDTO,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryModel.findOneAndUpdate(
      { region, _id, isActive: true },
      body,
      {
        new: true,
      },
    );

    return factory;
  }

  public async deleteFactory(
    region: string,
    _id: string,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryModel.findOneAndUpdate(
      { region, _id, isActive: true },
      { isActive: false },
      {
        new: true,
      },
    );

    return factory;
  }
}
