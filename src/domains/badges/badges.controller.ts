import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BadgesDocument } from './schema/badges.schema';
import { BadgesService } from './badges.service';
import { CreateBadgesDTO } from './dto/createdto/createbadge.dto';
import { UpdateBadgesDTO } from './dto/updatedto/updatebadge.dto';

@Controller('badge')
export class BadgesController {
  public constructor(public badgesServies: BadgesService) {}

  @Post()
  public async createBadge(
    @Headers('region') region: string,
    @Body() body: CreateBadgesDTO,
  ): Promise<BadgesDocument> {
    return await this.badgesServies.createBadge(region, body);
  }

  @Get(':niceName')
  public async fetchBadge(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<BadgesDocument> {
    return await this.badgesServies.fetchBadge(region, niceName);
  }

  @Put(':niceName')
  public async updateBadge(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateBadgesDTO,
  ): Promise<BadgesDocument> {
    return await this.badgesServies.updateBadge(region, niceName, body);
  }

  @Delete(':niceName')
  public async deleteBadge(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<BadgesDocument> {
    return await this.badgesServies.deleteBadge(region, niceName);
  }

  @Get()
  public async fetchBadges(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<BadgesDocument[]> {
    return await this.badgesServies.fetchBadges(region, search);
  }
}
