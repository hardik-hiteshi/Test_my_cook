import * as JSZip from 'jszip';
import * as xlsx from 'xlsx';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostTagDTO } from './dto/createDto/createPostTag.dto';
import { json2csv } from 'json-2-csv';
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
    let updatedPostTag: PostTagDocument;

    try {
      updatedPostTag = await this.postTagRepo.updatePostTag(
        region,
        uniqueId,
        body,
      );
    } catch (e) {
      if (e.code === 11000 || e.code === 11001) {
        throw new BadRequestException(e.message);
      } else {
        throw e;
      }
    }

    if (!updatedPostTag) {
      throw new NotFoundException('PostTag Not found.');
    }

    return updatedPostTag;
  }

  public async deletePostTag(
    region: string,
    uniqueId: string,
  ): Promise<object> {
    const deletedPostTag = await this.postTagRepo.deletePostTag(
      region,
      uniqueId,
    );
    if (!deletedPostTag) {
      throw new NotFoundException('PostTag Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchPostTags(
    region: string,
    search?: string,
  ): Promise<PostTagDocument[]> {
    const postTagsList = await this.postTagRepo.fetchPostTags(region, search);
    if (postTagsList.length > 0) {
      return postTagsList;
    }

    // throw new NotFoundException('PostTags not found.');

    return [];
  }

  public async exportFile(
    region: string,
    type: string,
  ): Promise<{ data: Buffer; type: string }> {
    type = type.toLocaleLowerCase();
    const postTags = await this.postTagRepo.fetchPostTags(region);

    if (postTags.length <= 0)
      throw new NotFoundException('Post-tags not found');
    if (type == 'csv') {
      const csv = await json2csv(postTags);

      const data = Buffer.from(csv);

      return { data, type };
    } else if (type === 'xlsx') {
      const ws = xlsx.utils.json_to_sheet(postTags);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      const xlsxData = xlsx.write(wb, {
        bookType: 'xlsx',
        type: 'buffer',
      }) as Buffer;

      return { data: xlsxData, type };
    } else if (type === 'jsonzip') {
      const jsonFiles: Buffer[] = [];
      const zip = new JSZip();
      const zipFolder = zip.folder('json_data');
      for (const entry of postTags) {
        const jsonData = JSON.stringify(entry, null, 2);
        jsonFiles.push(Buffer.from(jsonData));
      }

      for (let i = 0; i < jsonFiles.length; i++) {
        zipFolder.file(`data_${i}.json`, jsonFiles[i]);
      }

      const data = await zip.generateAsync({ type: 'nodebuffer' });

      return { data, type: 'zip' };
    } else if (type === 'json') {
      const data = Buffer.from(JSON.stringify(postTags));

      return { data, type };
    }
    throw new BadRequestException('invalid data type');
  }
}
