import { Ebook, EbookDocument } from '../schema/ebook.schema';
import { CreateEbookDTO } from '../dtos/createEbook/createEbook.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateEbookDTO } from '../dtos/updateEbook/updateEbook.dto';

@Injectable()
export class EbookRepository {
  public constructor(
    @InjectModel(Ebook.name) private ebookModel: Model<Ebook>,
  ) {}

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<EbookDocument> {
    return await this.ebookModel.findOne({
      niceName,
      region,
      isActive: true,
    });
  }

  public async findAll(region: string): Promise<EbookDocument[]> {
    return await this.ebookModel.find({
      region,
      isActive: true,
    });
  }

  public async findDuplicate(
    region: string,
    data: string[],
  ): Promise<EbookDocument[]> {
    return await this.ebookModel.find({
      region,
      niceName: { $in: data },
      isActive: true,
    });
  }

  public async createOne(
    region: string,
    body: CreateEbookDTO,
  ): Promise<EbookDocument> {
    return await this.ebookModel.create({ ...body, region });
  }

  public async updateOne(
    niceName: string,
    region: string,
    body: UpdateEbookDTO,
  ): Promise<EbookDocument> {
    return await this.ebookModel.findOneAndUpdate(
      {
        region,
        niceName,
        isActive: true,
      },
      body,
      { new: true },
    );
  }

  public async deleteOne(
    niceName: string,
    region: string,
  ): Promise<EbookDocument> {
    return await this.ebookModel.findOneAndUpdate(
      { niceName, region },
      { isActive: false },
      { new: true },
    );
  }

  public async findOneByQuery(query: object): Promise<object> {
    const data = await this.ebookModel
      .findOne(query)
      .populate('recipes', 'niceName -_id');

    const object = { data, recipes: data.recipes };

    return object;
  }

  public async updateEbook(
    query: object,
    data: object,
  ): Promise<EbookDocument> {
    return await this.ebookModel.findOneAndUpdate(query, data, { new: true });
  }

  public async createMany(data: CreateEbookDTO[]): Promise<EbookDocument[]> {
    return (await this.ebookModel.insertMany(data)) as EbookDocument[];
  }
}
