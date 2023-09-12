import { CreateTipDto, UpdateTipDto } from '../dtos';
import { Model, Schema } from 'mongoose';
import { Tip, TipDocument } from '../schema/tip.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TipRepository {
  public constructor(@InjectModel(Tip.name) private tipModel: Model<Tip>) {}

  public async findOne(id: Schema.Types.ObjectId): Promise<TipDocument> {
    return await this.tipModel.findById(id);
  }
  public async findAll(
    region: string,
    search?: string,
  ): Promise<TipDocument[]> {
    const query = {
      region,
      ...(search
        ? { $or: [{ text: { $regex: search.toString(), $options: 'i' } }] }
        : {}),
    };

    return await this.tipModel.find(query);
  }

  public async deleteOne(id: Schema.Types.ObjectId): Promise<TipDocument> {
    return await this.tipModel.findByIdAndDelete(id);
  }

  public async updateOne(
    id: Schema.Types.ObjectId,
    body: UpdateTipDto,
  ): Promise<TipDocument> {
    return await this.tipModel.findByIdAndUpdate(id, body, { new: true });
  }

  public async createOne(
    body: CreateTipDto,
    region: string,
  ): Promise<TipDocument> {
    return await this.tipModel.create({ ...body, region });
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
