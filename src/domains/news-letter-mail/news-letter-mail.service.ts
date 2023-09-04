import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewsLetterDto } from './dtos';
import { INewsLetter } from './interface/newsLetter.interface';
import { NewsLetterMailDocument } from './schema/news.letter-mail.schema';
import { NewsLetterMailRepository } from './repository/news-letter-mail.repository';
import { v4 as uuid } from 'uuid';
@Injectable()
export class NewsLetterMailService {
  public constructor(private newsLetterRepo: NewsLetterMailRepository) {}

  public async createOne(
    body: CreateNewsLetterDto,
    region: string,
  ): Promise<NewsLetterMailDocument> {
    const newsLetter = await this.newsLetterRepo.findOne({
      emailAddress: body.emailAddress,
    });

    if (newsLetter) throw new BadRequestException('news-letter already exist');

    const data: INewsLetter = {
      ...body,
      uniqueId: uuid(),
      region,
    };

    return await this.newsLetterRepo.createOne(data);
  }

  public async findOne(uniqueId: string): Promise<NewsLetterMailDocument> {
    const newsLetter = await this.newsLetterRepo.findOne({ uniqueId });
    if (!newsLetter) throw new NotFoundException('news-letter not found');

    return newsLetter;
  }

  public async findAll(region: string): Promise<NewsLetterMailDocument[]> {
    const newsLetter = await this.newsLetterRepo.findAll(region);
    if (newsLetter.length <= 0)
      throw new NotFoundException('news-letter not found');

    return newsLetter;
  }
}
