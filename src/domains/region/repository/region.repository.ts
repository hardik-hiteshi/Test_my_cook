import { Region, RegionDocument } from '../schema/region.schema';
import { CreateRegionDTO } from '../dto/createDTO/createregion.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRegionDTO } from '../dto/updateDTO/updateregion.dto';

@Injectable()
export class RegionRepository {
  public constructor(
    @InjectModel(Region.name) private regionModel: Model<Region>,
  ) {}

  public async findOne(niceName: string): Promise<RegionDocument> {
    return await this.regionModel
      .findOne({
        niceName,
      })
      .populate('adminUser', 'niceName -_id');
  }
  public async findAll(): Promise<RegionDocument[]> {
    return await this.regionModel.find({});
  }
  public async createOne(body: CreateRegionDTO): Promise<RegionDocument> {
    return await this.regionModel.create({ ...body });
  }
  public async updateOne(
    niceName: string,
    body: UpdateRegionDTO,
  ): Promise<RegionDocument> {
    return await this.regionModel.findOneAndUpdate(
      {
        niceName,
      },
      body,
      { new: true },
    );
  }
  public async deleteOne(niceName: string): Promise<RegionDocument> {
    return await this.regionModel.findOneAndDelete({ niceName });
  }
}
