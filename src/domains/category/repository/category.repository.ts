import { Category, CategoryDocument } from '../schema/category.schema';
import { CategoryQueryInterface } from './categoryqueryinterface.dto';
import { CreateCategoryDTO } from '../dto/createcategory/createcategory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCategoryDTO } from '../dto/updatecategory/updatecategory.dto';

export class CategoryRepository {
  public constructor(
    @InjectModel(Category.name) public categoryModel: Model<Category>,
  ) {}
  public async createCategory(
    region: string,
    body: CreateCategoryDTO,
  ): Promise<CategoryDocument> {
    const category = await this.categoryModel.create({ region, ...body });

    return category;
  }
  public async findOne(
    region: string,
    body?: CreateCategoryDTO,
  ): Promise<CategoryDocument> {
    const category = await this.categoryModel.findOne({
      niceName: body.niceName,
      region,
      isActive: true,
    });

    return category;
  }

  public async fetchCategory(
    region: string,
    niceName?: string,
  ): Promise<CategoryDocument> {
    const category = await this.categoryModel.findOne({
      niceName,
      region,
      isActive: true,
    });

    return category;
  }

  public async updateCategory(
    region: string,
    niceName: string,
    body: UpdateCategoryDTO,
  ): Promise<CategoryDocument> {
    const updatedCategory = await this.categoryModel.findOneAndUpdate(
      { region, niceName, isActive: true },
      body,
      { new: true },
    );

    return updatedCategory;
  }

  public async deleteCategory(
    region: string,
    niceName?: string,
  ): Promise<CategoryDocument> {
    const deletedCategory = await this.categoryModel.findOneAndUpdate(
      { region, niceName, isActive: true },
      { isActive: false },
      { new: true },
    );

    return deletedCategory;
  }

  public async fetchCategories(
    region: string,
    search: string,
  ): Promise<Array<CategoryDocument>> {
    {
      const query: CategoryQueryInterface = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { niceName: { $regex: search, $options: 'i' } },
          // { visibility: { $regex: search.toString(), $options: 'i' } },
          { landingText: { $regex: search.toString(), $options: 'i' } },
          { synonyms: { $regex: search.toString(), $options: 'i' } },
          //will work on translations later
          // { "translations._id": { $regex: search.toString(), $options: "i" } },
          // { "preserve._id": { $regex: search.toString(), $options: "i" } },
          // {
          //   "translations.to": {
          //     $elemMatch: {
          //       $or: [
          //         {
          //           region: {
          //             $regex: req.headers?.region?.toString() || "",
          //             $options: "i",
          //           },
          //         },
          //         { niceName: { $regex: search.toString(), $options: "i" } },
          //       ],
          //     },
          //   },
          // },
        ];
      }

      const categoriesList = await this.categoryModel.find({
        $and: [query, { isActive: true }, { region }],
      });
      if (categoriesList.length > 0) {
        return categoriesList;
      }

      return [];
    }
  }
}
