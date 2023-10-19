import { Region, RegionDocument } from '../schema/region.schema';
import { ContextFields } from '../schema/subSchema/contextFields.subSchema';
import { CreateRegionDTO } from '../dto/createDTO/createRegion.dto';
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

  public async findOneAdminUser(
    niceName: string,
  ): Promise<Partial<RegionDocument>> {
    return await this.regionModel
      .findOne({
        niceName,
      })
      .populate('adminUser', 'niceName -_id')
      .select('adminUser -_id');
  }

  public async findOneContextFields(
    niceName: string,
  ): Promise<Partial<RegionDocument>> {
    return await this.regionModel
      .findOne({
        niceName,
      })
      .select('contextFields -_id');
  }

  public async findOneContextFieldsByIndex(
    niceName: string,
    index: number,
  ): Promise<ContextFields> {
    const data = await this.regionModel
      .findOne({
        niceName,
      })
      .select('contextFields -_id');
    const contextFieldsIndexData = data.contextFields[index];

    return contextFieldsIndexData;
  }

  public async findAllAdminUser(niceName: string): Promise<RegionDocument> {
    const data = (await this.regionModel.find().populate('adminUser')) as Array<
      RegionDocument & {
        adminUser: { niceName: string };
      }
    >;

    const result = data.find((name) => name?.adminUser?.niceName === niceName);

    return result;
  }
}
