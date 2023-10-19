import { Factory, FactoryDocument } from '../schema/factory.schema';
import { CreateFactoryDTO } from '../dto/createfactory.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateFactoryDTO } from '../dto/updatefactory.dto';
import { v4 as uuid } from 'uuid';

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
    const factory = await this.factoryModel.create({
      ...body,
      uniqueId: uuid(),
      region,
    });

    return factory;
  }
  public async fetchFactories(region: string): Promise<FactoryDocument[]> {
    const factories = await this.factoryModel.find({ region, isActive: true });

    return factories;
  }

  public async updateFactory(
    region: string,
    uniqueId: string,
    body: UpdateFactoryDTO,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryModel.findOneAndUpdate(
      { region, uniqueId, isActive: true },
      body,
      {
        new: true,
      },
    );

    return factory;
  }

  public async deleteFactory(
    region: string,
    uniqueId: string,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryModel.findOneAndUpdate(
      { region, uniqueId, isActive: true },
      { isActive: false },
      {
        new: true,
      },
    );

    return factory;
  }

  public async fetchFactory(
    region: string,
    uniqueId: string,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryModel.findOne({ region, uniqueId });

    return factory;
  }
  // public async findAll(region: string) {}
  public async fetchFactoryMachineType(
    region: string,
    uniqueId: string,
  ): Promise<Partial<FactoryDocument>> {
    const machineType = await this.factoryModel
      .findOne({ region, uniqueId, isActive: true })
      .select('machineType -_id');

    return machineType;
  }
}
