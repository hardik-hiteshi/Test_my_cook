import { PostPage, PostPageDocument } from '../schema/post-page.schema';
import { CreatePostPageDTO } from '../dto/createDto/post-page.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostPageQueryInterface } from './post-page.query.interface';
import { UpdatePostPageDTO } from '../dto/updateDto/post-page.update.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostPageRepository {
  public constructor(
    @InjectModel(PostPage.name)
    public postPageModel: Model<PostPageDocument>,
  ) {}

  public async findOne(query: object): Promise<PostPageDocument> {
    const existingPostPage = await this.postPageModel.findOne(query);

    return existingPostPage;
  }

  public async createPostPage(
    region: string,
    body: CreatePostPageDTO,
  ): Promise<PostPageDocument> {
    const postPage = await this.postPageModel.create({
      ...body,
      uniqueId: uuid(),
      region,
    });

    return postPage;
  }

  public async fetchPostPage(
    region: string,
    uniqueId: string,
  ): Promise<PostPageDocument> {
    const postPage = await this.postPageModel.findOne({
      region,
      uniqueId,
      isActive: true,
    });

    return postPage;
  }

  public async updatePostPage(
    region: string,
    uniqueId: string,
    body: UpdatePostPageDTO,
  ): Promise<PostPageDocument> {
    const updatedPostPage = await this.postPageModel.findOneAndUpdate(
      { region, uniqueId, isActive: true },
      body,
      { new: true },
    );

    return updatedPostPage;
  }

  public async deletePostPage(
    region: string,
    uniqueId: string,
  ): Promise<PostPageDocument> {
    const deletedPostPage = await this.postPageModel.findOneAndUpdate(
      { region, uniqueId, isActive: true },
      { isActive: false },
      { new: true },
    );

    return deletedPostPage;
  }

  public async fetchPostPages(
    region: string,
    search?: string,
  ): Promise<PostPageDocument[]> {
    const query: PostPageQueryInterface = {
      region,
    };
    if (search) {
      query.$or = [
        { title: { $regex: search.toString(), $options: 'i' } },
        { region: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const postPages = await this.postPageModel.find({
      $and: [query, { isActive: true }],
    });

    return postPages;
  }

  public async findAll(region: string): Promise<PostPageDocument[]> {
    const query: PostPageQueryInterface = {
      region,
    };

    const postPages = await this.postPageModel.find({
      $and: [query, { isActive: true }],
    });

    return postPages;
  }
}
