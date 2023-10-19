import * as JSZip from 'jszip';
import * as xlsx from 'xlsx';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostPageDTO } from './dto/createDto/post-page.create.dto';
import { json2csv } from 'json-2-csv';
import { PostPageDocument } from './schema/post-page.schema';
import { PostPageRepository } from './repository/post-page.repository';
import { UpdatePostPageDTO } from './dto/updateDto/post-page.update.dto';

@Injectable()
export class PostPageService {
  public constructor(public postPageRepo: PostPageRepository) {}

  public async createPostPage(
    region: string,
    body: CreatePostPageDTO,
  ): Promise<PostPageDocument> {
    if (!body.cms && !body.cms.url && !body.cms.url.slug) {
      throw new NotFoundException('Post Page slug is required!.');
    }
    const existsSlug = await this.postPageRepo.findOne({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'cms.url.slug': body.cms.url.slug,
      region,
      isActive: true,
    });

    if (existsSlug) {
      throw new NotFoundException('Post Page slug already exists!.');
    }

    const postPage = await this.postPageRepo.createPostPage(region, body);

    return postPage;
  }

  public async fetchPostPage(
    region: string,
    uniqueId: string,
  ): Promise<PostPageDocument> {
    const postPage = await this.postPageRepo.fetchPostPage(region, uniqueId);
    if (!postPage) {
      throw new NotFoundException('PostPage not found.');
    }

    return postPage;
  }

  public async updatePostPage(
    region: string,
    uniqueId: string,
    body: UpdatePostPageDTO,
  ): Promise<PostPageDocument> {
    const updatedPostPage = await this.postPageRepo.updatePostPage(
      region,
      uniqueId,
      body,
    );
    if (!updatedPostPage) {
      throw new NotFoundException('PostPage Not found.');
    }

    return updatedPostPage;
  }

  public async deletePostPage(
    region: string,
    uniqueId: string,
  ): Promise<object> {
    const deletedPostPage = await this.postPageRepo.deletePostPage(
      region,
      uniqueId,
    );
    if (!deletedPostPage) {
      throw new NotFoundException('PostPage Not found.');
    }

    return { message: 'Delete Sucess' };
  }

  public async fetchPostPages(
    region: string,
    search?: string,
  ): Promise<PostPageDocument[]> {
    const postPagesList = await this.postPageRepo.fetchPostPages(
      region,
      search,
    );
    if (postPagesList.length > 0) {
      return postPagesList;
    }

    return [];
    // throw new NotFoundException('PostPages not found.');
  }

  public async exportFile(
    type: string,
    region: string,
  ): Promise<{ data: Buffer; type: string }> {
    type = type.toLocaleLowerCase();
    const machineModels = await this.postPageRepo.findAll(region);

    if (machineModels.length <= 0)
      throw new NotFoundException('machine_models not found');
    if (type === 'csv') {
      const csv = await json2csv(machineModels);
      const data = Buffer.from(csv);

      return { data, type };
    } else if (type === 'xlsx') {
      const ws = xlsx.utils.json_to_sheet(machineModels);
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
      for (const entry of machineModels) {
        const jsonData = JSON.stringify(entry, null, 2);
        jsonFiles.push(Buffer.from(jsonData));
      }

      for (let i = 0; i < jsonFiles.length; i++) {
        zipFolder.file(`data_${i}.json`, jsonFiles[i]);
      }

      const data = await zip.generateAsync({ type: 'nodebuffer' });

      return { data, type: 'zip' };
    } else if (type === 'json') {
      const data = Buffer.from(JSON.stringify(machineModels));

      return { data, type };
    }
    throw new BadRequestException('invalid data type');
  }
}
