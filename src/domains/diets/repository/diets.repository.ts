import { CreateDietDto, UpdateDietDto } from '../dtos';
import { Diet, DietDocument } from '../schema/diets.schema';
import { DietTo } from '../schema/subSchema/dietTo.subSchema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

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
  public async findAll(
    query: RecursivePartial<Diet> | object,
  ): Promise<DietDocument[]> {
    return await this.dietModel.find(query);
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
  public async findTags(
    niceName: string,
    region,
  ): Promise<DietDocument['tags']> {
    return (await this.dietModel.findOne({ niceName, region }).select('tags'))
      .tags;
  }
  public async findOneTag(
    niceName: string,
    index: number,
    region: string,
  ): Promise<string> {
    return (await this.dietModel.findOne({ niceName, region }).select('tags'))
      .tags[index];
  }
  public async findOneTranslation(
    niceName: string,
    index: number,
    region: string,
  ): Promise<DietTo> {
    return (
      await this.dietModel.findOne({ niceName, region }).select('translations')
    ).translations.to[index];
  }
  public async findTranslation(
    niceName: string,
    region: string,
  ): Promise<DietTo[]> {
    return (
      await this.dietModel.findOne({ niceName, region }).select('translations')
    ).translations.to;
  }
  public async findDistinctNiceName(region: string): Promise<string[]> {
    return await this.dietModel.distinct('niceName', { region }).lean();
  }

  public async createManyDiet(body: CreateDietDto[]): Promise<DietDocument[]> {
    return (await this.dietModel.insertMany(body)) as DietDocument[];
  }
}
