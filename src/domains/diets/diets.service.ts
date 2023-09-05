import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDietDto, UpdateDietDto } from './dtos';
import { DietDocument } from './schema/diets.schema';
import { DietsRepository } from './repository/diets.repository';

@Injectable()
export class DietsService {
  public dietAlreadyExist = 'diet already exist';
  public dietNotFound = 'diet not found';

  public constructor(private dietRepo: DietsRepository) {}

  public async createOne(
    body: CreateDietDto,
    region: string,
  ): Promise<DietDocument> {
    const diet = await this.dietRepo.findOne(body.niceName, region);

    if (diet) throw new BadRequestException(this.dietAlreadyExist);

    return await this.dietRepo.createOne(body, region);
  }

  public async updateOne(
    region: string,
    niceName: string,
    body: UpdateDietDto,
  ): Promise<DietDocument> {
    const diet = await this.dietRepo.updateOne(body, region, niceName);

    if (!diet) throw new NotFoundException(this.dietNotFound);

    return diet;
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<DietDocument> {
    const diet = await this.dietRepo.findOne(niceName, region);

    if (!diet) throw new NotFoundException(this.dietNotFound);

    return diet;
  }

  public async findAll(region: string): Promise<DietDocument[]> {
    const diet = await this.dietRepo.findAll(region);

    if (diet.length <= 0) throw new NotFoundException(this.dietNotFound);

    return diet;
  }

  public async deleteOne(niceName: string, region: string): Promise<void> {
    const diet = await this.dietRepo.deleteOne(niceName, region);
    if (!diet) throw new NotFoundException(this.dietNotFound);
  }
}
