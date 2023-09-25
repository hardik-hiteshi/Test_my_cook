import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateNewsDto, UpdateNewsDto } from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { GET_USER } from '../auth/decorator';
import { NewsDocument } from './schema/news.schema';
import { NewsService } from './news.service';
import { Role } from '../auth/roles/permission.roles';
import { UserDocument } from '../user/schema/user.schema';

@AUTH(Role.admin)
@Controller()
export class NewsController {
  public constructor(private newsService: NewsService) {}

  @Post('news')
  private async createNews(
    @Body() body: CreateNewsDto,
    @Headers('region') region: string,
  ): Promise<NewsDocument> {
    return await this.newsService.createOne(body, region);
  }

  @Put('news/:nicename')
  private async updatNews(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
    @Body() body: UpdateNewsDto,
  ): Promise<NewsDocument> {
    return this.newsService.updateOne(body, region, niceName);
  }

  @Get('news/:nicename')
  private async getNews(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<NewsDocument> {
    return await this.newsService.findOne(niceName, region);
  }

  @Get('news/range/:date')
  private async getNewsByDateRange(
    @GET_USER() user: UserDocument,
    @Param('date') date: string,
    @Headers('region') region: string,
    @Query('profile') profile?: string,
  ): Promise<NewsDocument[]> {
    return this.newsService.getNewsByDateRange(date, user, region, profile);
  }

  @Get('news/last/:last')
  private async getLastNews(
    @Headers('region') region: string,
    @Param('last', new ParseIntPipe()) last: number,
    @Query('profile') profile: string,
  ): Promise<NewsDocument> {
    return await this.newsService.getLastNews(last, region, profile);
  }

  // using hard delete for now
  @Delete('news/:nicename')
  private async deleteNews(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    return await this.newsService.deleteOne(region, niceName);
  }

  @Delete('news/:nicename/image')
  private async deleteImage(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    return await this.newsService.deleteImage(region, niceName);
  }

  @Get('newss')
  private async getAllNews(
    @Headers('region') region: string,
  ): Promise<NewsDocument[]> {
    return await this.newsService.findAll(region);
  }
}
