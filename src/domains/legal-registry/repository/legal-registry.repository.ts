import {
  LegalRegistry,
  LegalRegistryDocument,
} from '../schema/legal-registry.schema';
import { CreateLegalRegistryDTO } from '../dto/createLegalRegistry.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LegalRegistryRepository {
  public constructor(
    @InjectModel(LegalRegistry.name)
    public legalRegistryModel: Model<LegalRegistry>,
  ) {}

  public async findOne(
    region: string,
    body: CreateLegalRegistryDTO,
  ): Promise<LegalRegistryDocument> {
    const legalRegDoc = await this.legalRegistryModel.findOne({
      region,
      ...body,
    });

    return legalRegDoc;
  }

  public async create(
    region: string,
    body: CreateLegalRegistryDTO,
  ): Promise<LegalRegistryDocument> {
    const createdLegalRegDoc = await this.legalRegistryModel.create({
      region,
      uniqueId: uuid(),
      ...body,
    });

    return createdLegalRegDoc;
  }
  public async fetchOne(
    region: string,
    uniqueId: string,
  ): Promise<LegalRegistryDocument> {
    const legalRegDoc = await this.legalRegistryModel.findOne({
      region,
      uniqueId,
    });

    return legalRegDoc;
  }

  public async fetchAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<LegalRegistryDocument[]> {
    const skipAmount = (pageNumber - 1) * pageSize;
    const legalRegDoc = await this.legalRegistryModel
      .find({
        region,
      })
      .skip(skipAmount)
      .limit(pageSize);

    return legalRegDoc;
  }
}
