import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRankDTO } from './dto/createDto/createrank.dto';
import { RankDocument } from './schema/rank.schema';
import { RankService } from './rank.service';
import { UpdateRankDTO } from './dto/updateDto/updaterank.dto';

@Controller('rank')
export class RankController {
  public constructor(public rankServices: RankService) {}

  @Post('create')
  public async createRank(
    @Headers('region') region: string,
    @Body() body: CreateRankDTO,
  ): Promise<RankDocument> {
    return await this.rankServices.createRank(region, body);
  }

  @Get('fetch')
  public async fetchRank(
    @Headers('region') region: string,
    @Query('niceName') niceName: string,
  ): Promise<RankDocument> {
    return await this.rankServices.fetchRank(region, niceName);
  }
  @Patch('update')
  public async updateRank(
    @Headers('region') region: string,
    @Query('niceName') niceName: string,
    @Body() body: UpdateRankDTO,
  ): Promise<RankDocument> {
    return await this.rankServices.updateRank(region, niceName, body);
  }
  @Patch('delete')
  public async deleteRank(
    @Headers('region') region: string,
    @Query('niceName') niceName: string,
  ): Promise<RankDocument> {
    return await this.rankServices.deleteRank(region, niceName);
  }

  @Get('fetchall')
  public async fetchRanks(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<RankDocument[]> {
    return await this.rankServices.fetchRanks(region, search);
  }
}
