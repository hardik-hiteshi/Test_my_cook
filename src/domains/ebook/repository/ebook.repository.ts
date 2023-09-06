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
      //isActive: true,
    });
  }
  public async findAll(region: string): Promise<EbookDocument[]> {
    return await this.ebookModel.find({
      region,
      //isActive: true
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
        // isActive: true
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
      { isActive: true, niceName, region },
      { isActive: false },
      { new: true },
    );
  }
}
