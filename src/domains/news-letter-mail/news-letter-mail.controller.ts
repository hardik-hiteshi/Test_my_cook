import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { CreateManyNewsLetterDto, CreateNewsLetterDto } from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { NewsLetterMailDocument } from './schema/news.letter-mail.schema';
import { NewsLetterMailService } from './news-letter-mail.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
export class NewsLetterMailController {
  public constructor(private newsLetterService: NewsLetterMailService) {}
  @Post('newslettermail')
  private async createNewLetter(
    @Headers('region') region: string,
    @Body() body: CreateNewsLetterDto,
  ): Promise<NewsLetterMailDocument> {
    return await this.newsLetterService.createOne(body, region);
  }
  @Post('newslettermails')
  private async createManyNewsLetter(
    @Body() body: CreateManyNewsLetterDto,
  ): Promise<NewsLetterMailDocument[]> {
    return await this.newsLetterService.createMany(body);
  }

  @Get('newslettermail/:uniqueId')
  private async getNewLetter(
    @Param('uniqueId') uniqueId: string,
  ): Promise<NewsLetterMailDocument> {
    return await this.newsLetterService.findOne(uniqueId);
  }

  @Get('newslettermails')
  private async getAllNewsLetter(
    @Headers('region') region: string,
  ): Promise<NewsLetterMailDocument[]> {
    return await this.newsLetterService.findAll(region);
  }
}
