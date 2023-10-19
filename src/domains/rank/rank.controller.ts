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
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateRankDTO } from './dto/createDto/createrank.dto';
import { RankDocument } from './schema/rank.schema';
import { RankService } from './rank.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateRankDTO } from './dto/updateDto/updaterank.dto';
@AUTH(Role.admin)
@Controller()
export class RankController {
  public constructor(public rankServices: RankService) {}

  @Post('rank')
  public async createRank(
    @Headers('region') region: string,
    @Body() body: CreateRankDTO,
  ): Promise<RankDocument> {
    return await this.rankServices.createRank(region, body);
  }

  @Get('rank/:niceName')
  public async fetchRank(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<RankDocument> {
    return await this.rankServices.fetchRank(region, niceName);
  }

  @Put('rank/:niceName')
  public async updateRank(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateRankDTO,
  ): Promise<RankDocument> {
    return await this.rankServices.updateRank(region, niceName, body);
  }

  @Delete('rank/:niceName')
  public async deleteRank(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<object> {
    return await this.rankServices.deleteRank(region, niceName);
  }

  @Get('ranks')
  public async fetchRanks(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<RankDocument[]> {
    return await this.rankServices.fetchRanks(region, search);
  }
}
