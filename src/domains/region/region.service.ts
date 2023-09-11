import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ContextFields } from './schema/subSchema/contextFields.subSchema';
import { CreateManyRegionDto } from './dto/createManyRegion/createManyRegion.dto';
import { CreateRegionDTO } from './dto/createDTO/createRegion.dto';
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

  public async findOneAdminUser(niceName: string): Promise<RegionDocument> {
    const regionData = await this.regionRepo.findOneAdminUser(niceName);
    if (!regionData) throw new NotFoundException(this.regionNotFound);

    return regionData;
  }

  public async findOneContextFields(niceName: string): Promise<RegionDocument> {
    const regionData = await this.regionRepo.findOneContextFields(niceName);
    if (!regionData) throw new NotFoundException(this.regionNotFound);

    return regionData;
  }

  public async findOneContextFieldsByIndex(
    niceName: string,
    index: number,
  ): Promise<ContextFields> {
    const regionData = await this.regionRepo.findOneContextFieldsByIndex(
      niceName,
      index,
    );
    if (!regionData) throw new NotFoundException(this.regionNotFound);

    return regionData;
  }

  public async createMany(body: CreateManyRegionDto): Promise<{
    insertedDocuments: RegionDocument[];
    skippedDocuments: RegionDocument[];
  }> {
    const insertedDocuments: RegionDocument[] = [];
    const skippedDocuments: RegionDocument[] = [];

    for (const doc of body.data) {
      const regionData = await this.regionRepo.findOne(doc.niceName);
      if (regionData) {
        skippedDocuments.push(regionData);
      } else {
        const result = await this.regionRepo.createOne(doc);

        insertedDocuments.push(result);
      }
    }
    const finalData = {
      insertedDocuments,
      skippedDocuments,
    };

    return finalData;
  }

  public async findAllAdminUser(niceName: string): Promise<RegionDocument> {
    const regionData = await this.regionRepo.findAllAdminUser(niceName);
    if (!regionData) throw new NotFoundException(this.regionNotFound);

    return regionData;
  }
}
