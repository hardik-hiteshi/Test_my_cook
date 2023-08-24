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
    const category = await this.categoryRepo.findOne(region, body);

    if (!category) {
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

    // console.log(category);
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
    const category = await this.categoryRepo.updateCategory(
      region,
      niceName,
      body,
    );

    if (!category) {
      throw new NotFoundException('Document not found');
    }

    return category;
  }

  public async deleteCategory(
    region: string,
    niceName?: string,
  ): Promise<CategoryDocument> {
    const category = await this.categoryRepo.deleteCategory(region, niceName);

    if (!category) {
      throw new NotFoundException('Category does not exist.');
    }

    return category;
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
