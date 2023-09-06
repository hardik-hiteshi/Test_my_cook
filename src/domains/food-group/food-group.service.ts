import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFoodGroupDto } from './dtos/createFoodGroup/createFoodGroup.dto';
import { FoodGroupDocument } from './schema/food-group.schema';
import { FoodGroupRepository } from './repository/food-group.repository';
import { UpdateFoodGroupDto } from './dtos/updateFoodGroup/updateFoodGroup.dto';

@Injectable()
export class FoodGroupService {
  public foodGroupAlreadyExist = 'food group already exist';
  public foodGroupNotFound = 'food group not found';
  public constructor(private foodGroupRepo: FoodGroupRepository) {}

  public async createOne(
    body: CreateFoodGroupDto,
    region: string,
  ): Promise<FoodGroupDocument> {
    const foodGroup = await this.foodGroupRepo.findOne(region, body.niceName);
    if (foodGroup) throw new BadRequestException(this.foodGroupAlreadyExist);

    return await this.foodGroupRepo.createOne(body, region);
  }
  public async updateOne(
    body: UpdateFoodGroupDto,
    region: string,
    niceName: string,
  ): Promise<FoodGroupDocument> {
    const foodGroup = await this.foodGroupRepo.updateOne(
      region,
      niceName,
      body,
    );
    if (!foodGroup) throw new NotFoundException(this.foodGroupNotFound);

    return foodGroup;
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<FoodGroupDocument> {
    const foodGroup = await this.foodGroupRepo.findOne(region, niceName);

    if (!foodGroup) throw new NotFoundException(this.foodGroupNotFound);

    return foodGroup;
  }

  public async findAll(region): Promise<FoodGroupDocument[]> {
    const foodGroup = await this.foodGroupRepo.findAll(region);

    if (foodGroup.length <= 0)
      throw new NotFoundException(this.foodGroupNotFound);

    return foodGroup;
  }

  public async deleteOne(niceName: string, region: string): Promise<void> {
    const foodGroup = await this.foodGroupRepo.deleteOne(region, niceName);

    if (!foodGroup) throw new NotFoundException(this.foodGroupNotFound);
  }
}
