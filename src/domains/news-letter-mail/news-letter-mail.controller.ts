import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateNewsLetterDto } from './dtos';
import { NewsLetterMailDocument } from './schema/news.letter-mail.schema';
import { NewsLetterMailService } from './news-letter-mail.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller('news-letter-mail')
export class NewsLetterMailController {
  public constructor(private newsLetterService: NewsLetterMailService) {}
  @Post()
  private async createNewLetter(
    @Headers('region') region: string,
    @Body() body: CreateNewsLetterDto,
  ): Promise<NewsLetterMailDocument> {
    return await this.newsLetterService.createOne(body, region);
  }

  @Get(':uniqueId')
  private async getNewLetter(
    @Param('uniqueId') uniqueId: string,
  ): Promise<NewsLetterMailDocument> {
    return await this.newsLetterService.findOne(uniqueId);
  }

  @Get()
  private async getAllNewsLetter(
    @Headers('region') region: string,
  ): Promise<NewsLetterMailDocument[]> {
    return await this.newsLetterService.findAll(region);
  }
}
