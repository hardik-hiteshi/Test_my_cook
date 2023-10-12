import { CreateTipDto, UpdateTipDto } from '../dtos';
import { Tip, TipDocument } from '../schema/tip.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TipRepository {
  public constructor(@InjectModel(Tip.name) private tipModel: Model<Tip>) {}

  public async findOne(uniqueId: string): Promise<TipDocument> {
    return await this.tipModel.findOne({ uniqueId });
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<TipDocument[]> {
    const query = {
      region,
      ...(search
        ? { $or: [{ text: { $regex: search.toString(), $options: 'i' } }] }
        : {}),
    };
    const skipAmount = (pageNumber - 1) * pageSize;

    return await this.tipModel.find(query).skip(skipAmount).limit(pageSize);
  }

  public async deleteOne(uniqueId: string): Promise<TipDocument> {
    return await this.tipModel.findOneAndDelete({ uniqueId });
  }

  public async updateOne(
    uniqueId: string,
    body: UpdateTipDto,
  ): Promise<TipDocument> {
    return await this.tipModel.findOneAndUpdate({ uniqueId }, body, {
      new: true,
    });
  }

  public async createOne(
    body: CreateTipDto,
    region: string,
  ): Promise<TipDocument> {
    return await this.tipModel.create({ ...body, uniqueId: uuid(), region });
  }
  public async getTipCount(region: string): Promise<number> {
    return await this.tipModel.count({ region }).lean().exec();
  }

  public async findRandomTip(
    region: string,
    max: number,
  ): Promise<TipDocument> {
    const data = await this.tipModel
      .findOne({ region }, { _id: 0, text: 1 })
      .skip(Math.floor(Math.random() * (max - 1)))
      .exec();

    return data;
  }
}
