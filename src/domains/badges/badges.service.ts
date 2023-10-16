import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BadgesDocument } from './schema/badges.schema';
import { BadgesRespository } from './repository/badges.repository';
import { CreateBadgesDTO } from './dto/createdto/createbadge.dto';
import { UpdateBadgesDTO } from './dto/updatedto/updatebadge.dto';

@Injectable()
export class BadgesService {
  public constructor(public badgesRepo: BadgesRespository) {}

  public async createBadge(
    region: string,
    body: CreateBadgesDTO,
  ): Promise<BadgesDocument> {
    const badge = await this.badgesRepo.findOne(region, body.niceName);
    if (!badge) {
      const badge = await this.badgesRepo.createBadge(region, body);

      return badge;
    }
    throw new BadRequestException('Badge already exists.');
  }

  public async fetchBadge(
    region: string,
    niceName: string,
  ): Promise<BadgesDocument> {
    const badge = await this.badgesRepo.fetchBadge(region, niceName);
    if (!badge) throw new NotFoundException('No badge found');

    return badge;
  }

  public async updateBadge(
    region: string,
    niceName: string,
    body: UpdateBadgesDTO,
  ): Promise<BadgesDocument> {
    const updatedBadge = await this.badgesRepo.updateBadge(
      region,
      niceName,
      body,
    );
    if (!updatedBadge) throw new NotFoundException('No badge found');

    return updatedBadge;
  }

  public async deleteBadge(region: string, niceName: string): Promise<object> {
    const badge = await this.badgesRepo.deleteBadge(region, niceName);

    if (!badge) throw new NotFoundException('Badge not found.');

    return { message: 'Deleted Success' };
  }

  public async fetchBadges(
    region: string,
    search?: string,
  ): Promise<BadgesDocument[]> {
    const badges = await this.badgesRepo.fetchBadges(region, search);
    if (badges.length > 0) {
      return badges;
    }

    return [];

    // throw new NotFoundException('Badges not found.');
  }
}
