import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRankDTO } from './dto/createDto/createrank.dto';
import { RankDocument } from './schema/rank.schema';
import { RankRepository } from './repository/rank.repository';
import { UpdateRankDTO } from './dto/updateDto/updaterank.dto';

@Injectable()
export class RankService {
  public constructor(public rankRepo: RankRepository) {}

  public async createRank(
    region: string,
    body: CreateRankDTO,
  ): Promise<RankDocument> {
    const rank = await this.rankRepo.findOne(region, body);
    if (!rank) {
      const rank = await this.rankRepo.createRank(region, body);

      return rank;
    }
    throw new BadRequestException('Rank Already exists.');
  }

  public async fetchRank(
    region: string,
    niceName: string,
  ): Promise<RankDocument> {
    const rank = await this.rankRepo.fetchRank(region, niceName);
    if (!rank) {
      throw new NotFoundException('Rank not found.');
    }

    return rank;
  }

  public async updateRank(
    region: string,
    niceName: string,
    body: UpdateRankDTO,
  ): Promise<RankDocument> {
    const updatedRank = await this.rankRepo.updateRank(region, niceName, body);
    if (!updatedRank) {
      throw new NotFoundException('Rank Not found.');
    }

    return updatedRank;
  }

  public async deleteRank(region: string, niceName: string): Promise<object> {
    const deletedRank = await this.rankRepo.deleteRank(region, niceName);
    if (!deletedRank) {
      throw new NotFoundException('Rank Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchRanks(
    region: string,
    pageNumber: number,
    pageSize: number,

    search?: string,
  ): Promise<RankDocument[]> {
    const ranksList = await this.rankRepo.fetchRanks(
      region,
      pageNumber,
      pageSize,
      search,
    );
    if (ranksList.length > 0) {
      return ranksList;
    }
    // throw new NotFoundException('Ranks not found.');

    return [];
  }
}
