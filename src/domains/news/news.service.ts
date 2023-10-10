import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewsDto, UpdateNewsDto } from './dtos';
import { NewsDocument } from './schema/news.schema';
import { NewsRepository } from './repository/news.repository';
import { UserDocument } from '../user/schema/user.schema';

@Injectable()
export class NewsService {
  public constructor(private newsRepo: NewsRepository) {}

  public async createOne(
    body: CreateNewsDto,
    region: string,
  ): Promise<NewsDocument> {
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
    if (news.length > 0) {
      return news;
    }
    //  throw new NotFoundException('news not found');

    return [];
  }

  public async deleteOne(region: string, niceName: string): Promise<object> {
    const news = await this.newsRepo.deleteOne(region, niceName);
    if (!news) throw new NotFoundException('news not found');

    return { message: 'Deleted Success' };
  }

  public async deleteImage(region: string, niceName: string): Promise<void> {
    const news = await this.newsRepo.findOne(niceName, region);

    if (!news) throw new NotFoundException('news not found');

    news.image = [];

    await news.save();
  }

  public async getNewsByDateRange(
    dates: string,
    user: UserDocument,
    region: string,
    profiles?: string,
  ): Promise<NewsDocument[]> {
    const date = new Date(dates);
    if (isNaN(date.getTime())) throw new BadRequestException();

    const profile = profiles || 'machine';

    const news = await this.newsRepo.findNewsByDateRange(
      region,
      date,
      user,
      profile,
    );
    if (news.length <= 0) throw new NotFoundException('news not found');

    user.profile.lastViewNews = new Date();
    await user.save();

    return news;
  }

  public async getLastNews(
    last: number,
    region: string,
    profiles?: string,
  ): Promise<NewsDocument> {
    const profile = profiles || 'machine';

    const where = { enabled: true };

    where['media.' + profile] = true;

    const news = await this.newsRepo.findLastNews(region, profile, last);

    if (!news) throw new NotFoundException('news not found');

    return news;
  }
}
