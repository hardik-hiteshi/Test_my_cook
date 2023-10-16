import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateIngredientDto, UpdateIngredientDto } from './dtos';
import { IngredientDocument } from './schema/ingredient.schema';
import { IngredientRepository } from './repository/ingredient.repository';

@Injectable()
export class IngredientService {
  public ingredientNotFound = 'ingredient not found';
  public ingredientAlreadyExist = 'ingredient already exist';
  public constructor(private ingredientRepo: IngredientRepository) {}

  public async createOne(
    body: CreateIngredientDto,
    region: string,
  ): Promise<IngredientDocument> {
    const ingredient = await this.ingredientRepo.findOne(body.niceName, region);

    if (ingredient) throw new BadRequestException(this.ingredientAlreadyExist);

    return await this.ingredientRepo.createOne(body, region);
  }
  public async updateOne(
    body: UpdateIngredientDto,
    region: string,
    niceName: string,
  ): Promise<IngredientDocument> {
    const ingredient = await this.ingredientRepo.updateOne(
      body,
      niceName,
      region,
    );

    if (!ingredient) throw new NotFoundException(this.ingredientNotFound);

    return ingredient;
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<IngredientDocument> {
    const ingredient = await this.ingredientRepo.findOne(niceName, region);

    if (!ingredient) throw new NotFoundException(this.ingredientNotFound);

    return ingredient;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<IngredientDocument[]> {
    const ingredient = await this.ingredientRepo.findAll(
      region,
      pageNumber,
      pageSize,
    );

    if (ingredient.length > 0) {
      return ingredient;
    }
    // throw new NotFoundException(this.ingredientNotFound);

    return [];
  }

  public async deleteOne(region: string, niceName: string): Promise<object> {
    const ingredient = await this.ingredientRepo.deleteOne(niceName, region);

    if (!ingredient) throw new NotFoundException(this.ingredientNotFound);

    return { message: 'Deleted Success' };
  }
}
