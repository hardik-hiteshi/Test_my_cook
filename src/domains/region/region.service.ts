import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegionDTO } from './dto/createDTO/createregion.dto';
import { RegionDocument } from './schema/region.schema';
import { RegionRepository } from './repository/region.repository';
import { UpdateRegionDTO } from './dto/updateDTO/updateregion.dto';

@Injectable()
export class RegionService {
  public regionNotFound = 'Region not found';
  public regionAlreadyExist = 'Region already exist';
  public constructor(private regionRepo: RegionRepository) {}

  public async findOne(niceName: string): Promise<RegionDocument> {
    const regionData = await this.regionRepo.findOne(niceName);
    if (!regionData) throw new NotFoundException(this.regionNotFound);

    return regionData;
  }

  public async findAll(): Promise<RegionDocument[]> {
    const regions = await this.regionRepo.findAll();
    if (regions.length <= 0) throw new NotFoundException(this.regionNotFound);

    return regions;
  }

  public async createOne(body: CreateRegionDTO): Promise<RegionDocument> {
    const regionData = await this.regionRepo.findOne(body.niceName);

    if (regionData) throw new BadRequestException(this.regionAlreadyExist);

    return await this.regionRepo.createOne(body);
  }

  public async updateOne(
    niceName: string,
    body: UpdateRegionDTO,
  ): Promise<RegionDocument> {
    const regionData = await this.regionRepo.updateOne(niceName, body);
    if (!regionData) throw new NotFoundException(this.regionNotFound);

    return regionData;
  }

  public async deleteOne(niceName: string): Promise<void> {
    const regionData = await this.regionRepo.deleteOne(niceName);
    if (!regionData) throw new NotFoundException(this.regionNotFound);
  }
}
