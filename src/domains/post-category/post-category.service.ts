import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostCategoryDTO } from './dto/createDto/post-category.create.dto';
import { PostCategoryDocument } from './schema/post-category.schema';
import { PostCategoryRepository } from './repository//post-category.repository';
import { UpdatePostCategoryDTO } from './dto/updateDto/post-category.update.dto';

@Injectable()
export class PostCategoryService {
  public constructor(public postCategoryRepo: PostCategoryRepository) {}

  public async createPostCategory(
    region: string,
    body: CreatePostCategoryDTO,
  ): Promise<PostCategoryDocument> {
    const postCategory = await this.postCategoryRepo.findOne(region, body);
    if (!postCategory) {
      const postCategory = await this.postCategoryRepo.createPostCategory(
        region,
        body,
      );

      return postCategory;
    }
    throw new BadRequestException('PostCategory Already exists.');
  }

  public async fetchPostCategory(
    region: string,
    uniqueId: string,
  ): Promise<PostCategoryDocument> {
    const postCategory = await this.postCategoryRepo.fetchPostCategory(
      region,
      uniqueId,
    );
    if (!postCategory) {
      throw new NotFoundException('PostCategory not found.');
    }

    return postCategory;
  }

  public async updatePostCategory(
    region: string,
    uniqueId: string,
    body: UpdatePostCategoryDTO,
  ): Promise<PostCategoryDocument> {
    const updatedPostCategory = await this.postCategoryRepo.updatePostCategory(
      region,
      uniqueId,
      body,
    );
    if (!updatedPostCategory) {
      throw new NotFoundException('PostCategory Not found.');
    }

    return updatedPostCategory;
  }

  public async deletePostCategory(
    region: string,
    uniqueId: string,
  ): Promise<object> {
    const deletedPostCategory = await this.postCategoryRepo.deletePostCategory(
      region,
      uniqueId,
    );
    if (!deletedPostCategory) {
      throw new NotFoundException('PostCategory Not found.');
    }

    return { message: 'Delete Sucess' };
  }

  public async fetchPostCategories(
    region: string,
    search?: string,
  ): Promise<PostCategoryDocument[]> {
    const postCategorysList = await this.postCategoryRepo.fetchPostCategories(
      region,
      search,
    );
    if (postCategorysList.length > 0) {
      return postCategorysList;
    }

    return [];
    // throw new NotFoundException('PostCategorys not found.');
  }
}
