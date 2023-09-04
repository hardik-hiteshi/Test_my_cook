import {
  NewsLetterMail,
  NewsLetterMailDocument,
} from '../schema/news.letter-mail.schema';
import { INewsLetter } from '../interface/newsLetter.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

@Injectable()
export class NewsLetterMailRepository {
  public constructor(
    @InjectModel(NewsLetterMail.name)
    private newsLetterModel: Model<NewsLetterMail>,
  ) {}

  public async createOne(body: INewsLetter): Promise<NewsLetterMailDocument> {
    return await this.newsLetterModel.create(body);
  }

  public async findOne(
    query: RecursivePartial<NewsLetterMail> | object,
  ): Promise<NewsLetterMailDocument> {
    return await this.newsLetterModel.findOne(query);
  }

  public async findAll(region: string): Promise<NewsLetterMailDocument[]> {
    return await this.newsLetterModel.find({ region });
  }
}
