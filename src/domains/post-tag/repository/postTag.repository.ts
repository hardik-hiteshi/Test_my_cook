import { PostTag, PostTagDocument } from '../schema/postTag.schema';
import { CreatePostTagDTO } from '../dto/createDto/createPostTag.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePostTagDTO } from '../dto/updateDto/updatePostTag.dto';
import { v4 as uuid } from 'uuid';

export interface PostTagQueryInterface {
  region: string | undefined;
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
@Injectable()
export class PostTagRepository {
  public constructor(
    @InjectModel(PostTag.name) public postTagModel: Model<PostTagDocument>,
  ) {}

  public async findOne(
    region: string,
    body: CreatePostTagDTO,
  ): Promise<PostTagDocument> {
    const existingPostTag = await this.postTagModel.findOne({
      region,
      ...body,
      isActive: true,
    });

    return existingPostTag;
  }

  public async createPostTag(
    region: string,
    body: CreatePostTagDTO,
  ): Promise<PostTagDocument> {
    const uniqueId = uuid();
    const postTag = await this.postTagModel.create({
      ...body,
      region,
      uniqueId,
    });

    return postTag;
  }

  public async fetchPostTag(
    region: string,
    uniqueId: string,
  ): Promise<PostTagDocument> {
    const postTag = await this.postTagModel.findOne({
      region,
      uniqueId,
      isActive: true,
    });

    return postTag;
  }

  public async updatePostTag(
    region: string,
    uniqueId: string,
    body: UpdatePostTagDTO,
  ): Promise<PostTagDocument> {
    const updatedPostTag = await this.postTagModel.findOneAndUpdate(
      { region, uniqueId, isActive: true },
      body,
      { new: true },
    );

    return updatedPostTag;
  }

  public async deletePostTag(
    region: string,
    uniqueId: string,
  ): Promise<PostTagDocument> {
    const deletedPostTag = await this.postTagModel.findOneAndUpdate(
      { region, uniqueId, isActive: true },
      { isActive: false },
      { new: true },
    );

    return deletedPostTag;
  }

  public async fetchPostTags(
    region: string,
    pageNumber?: number,
    pageSize?: number,
    search?: string,
  ): Promise<PostTagDocument[]> {
    const query: PostTagQueryInterface = {
      region,
    };
    const skipAmount = (pageNumber - 1) * pageSize;
    if (search) {
      query.$or = [
        { text: { $regex: search.toString(), $options: 'i' } },
        { description: { $regex: search.toString(), $options: 'i' } },
        /* eslint-disable @typescript-eslint/naming-convention */
        { 'cms.url.slug': { $regex: search.toString(), $options: 'i' } },
        { region: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const postTags = await this.postTagModel
      .find({
        $and: [query, { isActive: true }],
      })
      .skip(skipAmount)
      .limit(pageSize);

    return postTags;
  }
}
