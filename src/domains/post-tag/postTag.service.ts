import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostTagDTO } from './dto/createDto/createPostTag.dto';
import { PostTagDocument } from './schema/postTag.schema';
import { PostTagRepository } from './repository/postTag.repository';
import { UpdatePostTagDTO } from './dto/updateDto/updatePostTag.dto';

@Injectable()
export class PostTagService {
  public constructor(public postTagRepo: PostTagRepository) {}

  public async createPostTag(
    region: string,
    body: CreatePostTagDTO,
  ): Promise<PostTagDocument> {
    const postTag = await this.postTagRepo.findOne(region, body);
    if (!postTag) {
      const postTag = await this.postTagRepo.createPostTag(region, body);

      return postTag;
    }
    throw new BadRequestException('PostTag Already exists.');
  }

  public async fetchPostTag(
    region: string,
    uniqueId: string,
  ): Promise<PostTagDocument> {
    const postTag = await this.postTagRepo.fetchPostTag(region, uniqueId);
    if (!postTag) {
      throw new NotFoundException('PostTag not found.');
    }

    return postTag;
  }

  public async updatePostTag(
    region: string,
    uniqueId: string,
    body: UpdatePostTagDTO,
  ): Promise<PostTagDocument> {
    const updatedPostTag = await this.postTagRepo.updatePostTag(
      region,
      uniqueId,
      body,
    );
    if (!updatedPostTag) {
      throw new NotFoundException('PostTag Not found.');
    }

    return updatedPostTag;
  }

  public async deletePostTag(
    region: string,
    uniqueId: string,
  ): Promise<PostTagDocument> {
    const deletedPostTag = await this.postTagRepo.deletePostTag(
      region,
      uniqueId,
    );
    if (!deletedPostTag) {
      throw new NotFoundException('PostTag Not found.');
    }

    return deletedPostTag;
  }

  public async fetchPostTags(
    region: string,
    search?: string,
  ): Promise<PostTagDocument[]> {
    const postTagsList = await this.postTagRepo.fetchPostTags(region, search);
    if (postTagsList.length > 0) {
      return postTagsList;
    }
    throw new NotFoundException('PostTags not found.');
  }
}
