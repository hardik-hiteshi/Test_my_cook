import {
  PostCategory,
  PostCategoryDocument,
} from '../schema/post-category.schema';
import { CreatePostCategoryDTO } from '../dto/createDto/post-category.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostCategoryQueryInterface } from './postCategory.query.interface';
import { UpdatePostCategoryDTO } from '../dto/updateDto/post-category.update.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostCategoryRepository {
  public constructor(
    @InjectModel(PostCategory.name)
    public postCategoryModel: Model<PostCategoryDocument>,
  ) {}
  public async findOne(
    region: string,
    body: CreatePostCategoryDTO,
  ): Promise<PostCategoryDocument> {
    const existingPostCategory = await this.postCategoryModel.findOne({
      region,
      ...body,
      isActive: true,
    });

    return existingPostCategory;
  }
  public async createPostCategory(
    region: string,
    body: CreatePostCategoryDTO,
  ): Promise<PostCategoryDocument> {
    const postCategory = await this.postCategoryModel.create({
      ...body,
      uniqueId: uuid(),
      region,
    });

    return postCategory;
  }

  public async fetchPostCategory(
    region: string,
    uniqueId: string,
  ): Promise<PostCategoryDocument> {
    const postCategory = await this.postCategoryModel.findOne({
      region,
      uniqueId,
      isActive: true,
    });

    return postCategory;
  }

  public async updatePostCategory(
    region: string,
    uniqueId: string,
    body: UpdatePostCategoryDTO,
  ): Promise<PostCategoryDocument> {
    const updatedPostCategory = await this.postCategoryModel.findOneAndUpdate(
      { region, uniqueId, isActive: true },
      body,
      { new: true },
    );

    return updatedPostCategory;
  }

  public async deletePostCategory(
    region: string,
    uniqueId: string,
  ): Promise<PostCategoryDocument> {
    const deletedPostCategory = await this.postCategoryModel.findOneAndUpdate(
      { region, uniqueId, isActive: true },
      { isActive: false },
      { new: true },
    );

    return deletedPostCategory;
  }

  public async fetchPostCategories(
    region: string,
    search?: string,
  ): Promise<PostCategoryDocument[]> {
    const query: PostCategoryQueryInterface = {
      region,
    };
    if (search) {
      query.$or = [
        { name: { $regex: search.toString(), $options: 'i' } },
        { niceName: { $regex: search.toString(), $options: 'i' } },
        { description: { $regex: search.toString(), $options: 'i' } },
        { region: { $regex: search.toString(), $options: 'i' } },
        //will work on this later.
        // {
        //   'translations.from.region': {
        //     $regex: search.toString(),
        //     $options: 'i',
        //   },
        // },
        // {
        //   'translations.from.niceName': {
        //     $regex: search.toString(),
        //     $options: 'i',
        //   },
        // },
      ];
    }

    const postCategorys = await this.postCategoryModel.find({
      $and: [query, { isActive: true }],
    });

    return postCategorys;
  }
}
