import { CreatePictosDto, UpdatePictosDto } from '../dtos';
import { Pictos, PictosDocument } from '../schema/pictos.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

@Injectable()
export class PictosRepository {
  public constructor(
    @InjectModel(Pictos.name) private pictosModel: Model<Pictos>,
  ) {}

  public async findOne(
    query: RecursivePartial<Pictos> | object,
  ): Promise<PictosDocument> {
    return await this.pictosModel.findOne(query);
  }
  public async findAll(region: string): Promise<PictosDocument[]> {
    return await this.pictosModel.find({ isDeleted: false, region });
  }
  public async createOne(
    body: CreatePictosDto,
    region: string,
  ): Promise<PictosDocument> {
    return await this.pictosModel.create({ ...body, region });
  }
  public async updateOne(
    niceName: string,
    body: UpdatePictosDto,
    region: string,
  ): Promise<PictosDocument> {
    return await this.pictosModel.findOneAndUpdate({ niceName, region }, body, {
      new: true,
    });
  }
}
