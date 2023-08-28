import {
  Advertisement,
  AdvertisementDocument,
} from '../schemas/advertisement.schema';
import { AdQueryInterface } from './advertisement.queryinterface';
import { CreateAdvertisementDTO } from '../dto/createadvertisement.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAdvertisementDTO } from '../dto/updateadvertisement.dto';
@Injectable()
export class AdvertisementRepository {
  public constructor(
    @InjectModel(Advertisement.name)
    public advertisementModel: Model<AdvertisementDocument>,
  ) {}

  public async createAdvertisement(
    region: string,
    body: CreateAdvertisementDTO,
  ): Promise<AdvertisementDocument> {
    const advertisement = await this.advertisementModel.create({
      region,
      ...body,
    });

    return advertisement;
  }

  public async findOne(
    region: string,
    body: CreateAdvertisementDTO,
  ): Promise<AdvertisementDocument> {
    const existingAdvertisement = await this.advertisementModel.findOne({
      region,
      ...body,
      isActive: true,
    });

    return existingAdvertisement;
  }

  public async fetchAdvertisement(
    region: string,
    niceName: string,
  ): Promise<AdvertisementDocument> {
    const advertisement = await this.advertisementModel
      .findOne({ region, niceName, isActive: true })
      .populate('category');

    return advertisement;
  }

  public async updateAdvertisement(
    region: string,
    niceName: string,
    body: UpdateAdvertisementDTO,
  ): Promise<AdvertisementDocument> {
    const updatedAdvertisement = await this.advertisementModel.findOneAndUpdate(
      { region, niceName, isActive: true },
      body,
      { new: true },
    );

    return updatedAdvertisement;
  }

  public async deleteAdvertisement(
    region: string,
    niceName: string,
  ): Promise<AdvertisementDocument> {
    const deleteAdvertisement = await this.advertisementModel.findOneAndUpdate(
      { region, niceName, isActive: true },
      { isActive: false },
      { new: true },
    );

    return deleteAdvertisement;
  }
  public async fetchAdvertisements(
    region: string,
    search: string,
  ): Promise<AdvertisementDocument[]> {
    const query: AdQueryInterface = {};
    const parsed = Number(search);
    const viewsFilter = !isNaN(parsed) ? { views: parsed } : {};
    const clicksFilter = !isNaN(parsed) ? { clicks: parsed } : {};
    const dateFilter = Date.parse(search)
      ? { date: new Date(search).toISOString() }
      : {};

    if (search) {
      query.$or = [
        viewsFilter,
        clicksFilter,
        { niceName: { $regex: search.toString(), $options: 'i' } },
        dateFilter,
        //will work on searching advertisement search later
        // { category: { $regex: search.toString(), $options: 'i' } },
        { url: { $regex: search.toString(), $options: 'i' } },
        { urlTitle: { $regex: search.toString(), $options: 'i' } },
        { region: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const advertisementList = await this.advertisementModel.find({
      $and: [query, { isActive: true }, { region }],
    });

    return advertisementList;
  }
}
