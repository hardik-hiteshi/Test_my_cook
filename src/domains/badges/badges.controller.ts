import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BadgesDocument } from './schema/badges.schema';
import { BadgesService } from './badges.service';
import { CreateBadgesDTO } from './dto/createdto/createbadge.dto';
import { UpdateBadgesDTO } from './dto/updatedto/updatebadge.dto';

@Controller('badges')
export class BadgesController {
  public constructor(public badgesServies: BadgesService) {}
  @Post('create')
  public async createBadge(
    @Headers('region') region: string,
    @Body() body: CreateBadgesDTO,
  ): Promise<BadgesDocument> {
    return await this.badgesServies.createBadge(region, body);
  }
  @Get('fetch')
  public async fetchBadge(
    @Headers('region') region: string,
    @Query('niceName') niceName: string,
  ): Promise<BadgesDocument> {
    return await this.badgesServies.fetchBadge(region, niceName);
  }

  @Patch('update')
  public async updateBadge(
    @Headers('region') region: string,
    @Query('niceName') niceName: string,
    @Body() body: UpdateBadgesDTO,
  ): Promise<BadgesDocument> {
    return await this.badgesServies.updateBadge(region, niceName, body);
  }
  @Get('fetch')
  public async fetchBadges(
    @Headers('region') region: string,
    @Query('search') search: string,
  ): Promise<BadgesDocument[]> {
    return await this.badgesServies.fetchBadges(region, search);
  }
}
