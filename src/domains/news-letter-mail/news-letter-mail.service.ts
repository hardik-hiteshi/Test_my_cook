import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateManyNewsLetterDto, CreateNewsLetterDto } from './dtos';
import { INewsLetter } from './interface/newsLetter.interface';
import { NewsLetterDto } from './dtos/createManyNewsLetter/subDto/createNewsLetter.dto';
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
    if (newsLetter.length > 0) {
      return newsLetter;
    }
    // throw new NotFoundException('news-letter not found');

    return [];
  }

  public async createMany(
    body: CreateManyNewsLetterDto,
  ): Promise<NewsLetterMailDocument[]> {
    let existingItemSerial: string[];
    let itemsToInsert: NewsLetterDto[];
    const data = body.data.map((i) => i.emailAddress);
    const existingItems = await this.newsLetterRepo.findAllByQuery({
      emailAddress: { $in: data },
    });

    if (existingItems.length > 0) {
      existingItemSerial = existingItems.map(
        (item: CreateNewsLetterDto) => item.emailAddress,
      );

      itemsToInsert = body.data.filter(
        (item) => !existingItemSerial.includes(item.emailAddress),
      );
    } else {
      itemsToInsert = body.data;
    }

    if (itemsToInsert.length === 0) {
      throw new BadRequestException('All items already exist');
    }
    const itemsWithUniqueId: INewsLetter[] = itemsToInsert.map((i) => ({
      ...i,
      uniqueId: uuid(),
    }));

    return await this.newsLetterRepo.createMany(itemsWithUniqueId);
  }
}
