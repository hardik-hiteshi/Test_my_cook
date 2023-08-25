import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryDocument } from './schema/category.schema';
import { CategoryRepository } from './repository/category.repository';
import { CreateCategoryDTO } from './dto/createcategory/createcategory.dto';
import { UpdateCategoryDTO } from './dto/updatecategory/updatecategory.dto';
@Injectable()
export class CategoryService {
  public constructor(public categoryRepo: CategoryRepository) {}
  public async createCategory(
    region: string,
    body: CreateCategoryDTO,
  ): Promise<CategoryDocument> {
    const existingCategory = await this.categoryRepo.findOne(region, body);

    if (!existingCategory) {
      const category = await this.categoryRepo.createCategory(region, body);

      return category;
    }
    throw new BadRequestException('Category already exists.');
  }

  public async fetchCategory(
    region: string,
    id?: string,
    niceName?: string,
  ): Promise<CategoryDocument> {
    const category = await this.categoryRepo.fetchCategory(
      region,
      id,
      niceName,
    );

    if (category) {
      return category;
    }
    throw new NotFoundException('Category not found');
  }

  public async updateCategory(
    region: string,
    niceName: string,
    body: UpdateCategoryDTO,
  ): Promise<CategoryDocument> {
    const updatedCategory = await this.categoryRepo.updateCategory(
      region,
      niceName,
      body,
    );

    if (!updatedCategory) {
      throw new NotFoundException('Document not found');
    }

    return updatedCategory;
  }

  public async deleteCategory(
    region: string,
    niceName?: string,
  ): Promise<CategoryDocument> {
    const deletedCategory = await this.categoryRepo.deleteCategory(
      region,
      niceName,
    );

    if (!deletedCategory) {
      throw new NotFoundException('Category does not exist.');
    }

    return deletedCategory;
  }

  public async fetchCategories(
    region: string,
    search: string,
  ): Promise<CategoryDocument[]> {
    const categories = await this.categoryRepo.fetchCategories(region, search);
    if (categories.length > 0) {
      return categories;
    }
    throw new NotFoundException('No Categories found.');
  }
}
