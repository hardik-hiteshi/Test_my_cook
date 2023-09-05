import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateNewsDto, UpdateNewsDto } from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { NewsDocument } from './schema/news.schema';
import { NewsService } from './news.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller('news')
export class NewsController {
  public constructor(private newsService: NewsService) {}
  @Post()
  private async createNews(
    @Body() body: CreateNewsDto,
    @Headers('region') region: string,
  ): Promise<NewsDocument> {
    return await this.newsService.createOne(body, region);
  }
  @Patch(':nicename')
  private async updatNews(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
    @Body() body: UpdateNewsDto,
  ): Promise<NewsDocument> {
    return this.newsService.updateOne(body, region, niceName);
  }

  @Get(':nicename')
  private async getNews(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<NewsDocument> {
    return await this.newsService.findOne(niceName, region);
  }

  @Get()
  private async getAllNews(
    @Headers('region') region: string,
  ): Promise<NewsDocument[]> {
    return await this.newsService.findAll(region);
  }

  @Delete(':nicename')
  private async deleteNews(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    return await this.newsService.deleteOne(region, niceName);
  }
}
