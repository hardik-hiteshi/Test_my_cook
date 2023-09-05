import { CreateNewsDto, UpdateNewsDto } from '../dtos';
import { News, NewsDocument } from '../schema/news.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NewsRepository {
  public constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

  public async createOne(
    body: CreateNewsDto,
    region: string,
  ): Promise<NewsDocument> {
    return await this.newsModel.create({ ...body, region });
  }
  public async updateOne(
    body: UpdateNewsDto,
    region: string,
    niceName: string,
  ): Promise<NewsDocument> {
    return await this.newsModel.findOneAndUpdate({ region, niceName }, body, {
      new: true,
    });
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<NewsDocument> {
    return await this.newsModel
      .findOne({ niceName, region })
      .populate('recipes');
  }

  public async findAll(region: string): Promise<NewsDocument[]> {
    return await this.newsModel.find({ region }).populate('recipes');
  }

  public async deleteOne(
    region: string,
    niceName: string,
  ): Promise<NewsDocument> {
    return await this.newsModel.findOneAndDelete({ niceName, region });
  }
}
