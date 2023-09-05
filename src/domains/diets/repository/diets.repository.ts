import { CreateDietDto, UpdateDietDto } from '../dtos';
import { Diet, DietDocument } from '../schema/diets.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DietsRepository {
  public constructor(@InjectModel(Diet.name) private dietModel: Model<Diet>) {}

  public async createOne(
    body: CreateDietDto,
    region: string,
  ): Promise<DietDocument> {
    return await this.dietModel.create({ ...body, region });
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<DietDocument> {
    return await this.dietModel.findOne({ niceName, region });
  }
  public async findAll(region: string): Promise<DietDocument[]> {
    return await this.dietModel.find({ region });
  }
  public async updateOne(
    body: UpdateDietDto,
    region: string,
    niceName: string,
  ): Promise<DietDocument> {
    return await this.dietModel.findOneAndUpdate({ niceName, region }, body, {
      new: true,
    });
  }
  public async deleteOne(
    niceName: string,
    region: string,
  ): Promise<DietDocument> {
    return await this.dietModel.findOneAndDelete({ niceName, region });
  }
}
