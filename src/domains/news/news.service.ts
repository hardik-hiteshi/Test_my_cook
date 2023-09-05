import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewsDto, UpdateNewsDto } from './dtos';
import { NewsDocument } from './schema/news.schema';
import { NewsRepository } from './repository/news.repository';

@Injectable()
export class NewsService {
  public constructor(private newsRepo: NewsRepository) {}

  public async createOne(
    body: CreateNewsDto,
    region: string,
  ): Promise<NewsDocument> {
    const news = await this.newsRepo.findOne(body.niceName, region);

    if (news) throw new BadRequestException('news already exist');

    return await this.newsRepo.createOne(body, region);
  }

  public async updateOne(
    body: UpdateNewsDto,
    region: string,
    niceName: string,
  ): Promise<NewsDocument> {
    const news = await this.newsRepo.updateOne(body, region, niceName);
    if (!news) throw new NotFoundException('news not found');

    return news;
  }

  public async findOne(niceName: string, region): Promise<NewsDocument> {
    const news = await this.newsRepo.findOne(niceName, region);
    if (!news) throw new NotFoundException('news not found');

    return news;
  }

  public async findAll(region: string): Promise<NewsDocument[]> {
    const news = await this.newsRepo.findAll(region);
    if (news.length <= 0) throw new NotFoundException('news not found');

    return news;
  }

  public async deleteOne(region: string, niceName: string): Promise<void> {
    const news = await this.newsRepo.deleteOne(region, niceName);
    if (!news) throw new NotFoundException('news not found');
  }
}
