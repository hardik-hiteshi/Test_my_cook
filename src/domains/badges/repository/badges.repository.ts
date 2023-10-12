import { Badges, BadgesDocument } from '../schema/badges.schema';
import { BadgeQueryInterface } from './badges.query.interface';
import { CreateBadgesDTO } from '../dto/createdto/createbadge.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateBadgesDTO } from '../dto/updatedto/updatebadge.dto';

@Injectable()
export class BadgesRespository {
  public constructor(
    @InjectModel(Badges.name) public badgesModel: Model<BadgesDocument>,
  ) {}

  public async findOne(
    region: string,
    body: CreateBadgesDTO,
  ): Promise<unknown> {
    const badge = await this.badgesModel.findOne({
      region,
      ...body,
      isActive: true,
    });

    return badge;
  }
  public async createBadge(
    region: string,
    body: CreateBadgesDTO,
  ): Promise<BadgesDocument> {
    const badge = await this.badgesModel.create({ ...body, region });

    return badge;
  }

  public async fetchBadge(
    region: string,
    niceName: string,
  ): Promise<BadgesDocument> {
    const badge = await this.badgesModel.findOne({
      region,
      niceName,
      isActive: true,
    });

    return badge;
  }

  public async updateBadge(
    region: string,
    niceName: string,
    body: UpdateBadgesDTO,
  ): Promise<BadgesDocument> {
    const updatedBadge = await this.badgesModel.findOneAndUpdate(
      { region, niceName, isActive: true },
      body,
      { new: true },
    );

    return updatedBadge;
  }

  public async deleteBadge(
    region: string,
    niceName: string,
  ): Promise<BadgesDocument> {
    const badge = await this.badgesModel.findOneAndUpdate(
      { region, niceName, isActive: true },
      { isActive: false },
      { new: true },
    );

    return badge;
  }

  public async fetchBadges(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<BadgesDocument[]> {
    const query: BadgeQueryInterface = {};
    const parsedIndex = Number(search);
    const indexFilter = !isNaN(parsedIndex) ? { index: parsedIndex } : {};
    const skipAmount = (pageNumber - 1) * pageSize;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { niceName: { $regex: search, $options: 'i' } },
        indexFilter,
        { range: { $regex: search.toString(), $options: 'i' } },
        { description: { $regex: search.toString(), $options: 'i' } },
        { prizeTxt: { $regex: search.toString(), $options: 'i' } },
        { prize: { $regex: search.toString(), $options: 'i' } },
        { terms: { $regex: search.toString(), $options: 'i' } },
        //will work on this later.
        // { 'translations._id': { $regex: search.toString(), $options: 'i' } },
        // { 'preserve._id': { $regex: search.toString(), $options: 'i' } },
        // {
        //   'translations.to': {
        //     $elemMatch: {
        //       $or: [
        //         { region: { $regex: search.toString(), $options: 'i' } },
        //         { niceName: { $regex: search.toString(), $options: 'i' } },
        //       ],
        //     },
        //   },
        // },
      ];
    }

    const badges = await this.badgesModel
      .find({
        $and: [query, { isActive: true }, { region }],
      })
      .skip(skipAmount)
      .limit(pageSize);

    // if (badges.length > 0) {
    return badges;
    // }
  }
}
