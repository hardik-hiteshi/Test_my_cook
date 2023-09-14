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
import { CreateRankDTO } from './dto/createDto/createrank.dto';
import { RankDocument } from './schema/rank.schema';
import { RankService } from './rank.service';
import { UpdateRankDTO } from './dto/updateDto/updaterank.dto';

@Controller('rank')
export class RankController {
  public constructor(public rankServices: RankService) {}

  @Post()
  public async createRank(
    @Headers('region') region: string,
    @Body() body: CreateRankDTO,
  ): Promise<RankDocument> {
    return await this.rankServices.createRank(region, body);
  }

  @Get(':niceName')
  public async fetchRank(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<RankDocument> {
    return await this.rankServices.fetchRank(region, niceName);
  }
  @Put(':niceName')
  public async updateRank(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateRankDTO,
  ): Promise<RankDocument> {
    return await this.rankServices.updateRank(region, niceName, body);
  }
  @Delete(':niceName')
  public async deleteRank(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<RankDocument> {
    return await this.rankServices.deleteRank(region, niceName);
  }

  @Get()
  public async fetchRanks(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<RankDocument[]> {
    return await this.rankServices.fetchRanks(region, search);
  }
}
