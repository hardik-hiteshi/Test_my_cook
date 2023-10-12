import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreatePostPageDTO } from './dto/createDto/post-page.create.dto';
import { PostPageDocument } from './schema/post-page.schema';
import { PostPageService } from './post-page.service';
import type { Response } from 'express';
import { Role } from '../auth/roles/permission.roles';
import { UpdatePostPageDTO } from './dto/updateDto/post-page.update.dto';

@AUTH(Role.admin)
@Controller()
export class PostPageController {
  public constructor(public postPageServices: PostPageService) {}

  @Post('post')
  public async createPostPage(
    @Headers('region') region: string,
    @Body() body: CreatePostPageDTO,
  ): Promise<PostPageDocument> {
    return await this.postPageServices.createPostPage(region, body);
  }

  @Get('post/:uniqueId')
  public async fetchPostPage(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<PostPageDocument> {
    return await this.postPageServices.fetchPostPage(region, uniqueId);
  }

  @Put('post/:uniqueId')
  public async updatePostPage(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdatePostPageDTO,
  ): Promise<PostPageDocument> {
    return await this.postPageServices.updatePostPage(region, uniqueId, body);
  }

  @Delete('post/:uniqueId')
  public async deletePostPage(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<object> {
    return await this.postPageServices.deletePostPage(region, uniqueId);
  }

  @Get('posts')
  public async fetchPostPages(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<PostPageDocument[]> {
    return await this.postPageServices.fetchPostPages(
      region,
      pageNumber,
      pageSize,
      search,
    );
  }

  @Get('post/export/:type')
  private async exportPostPages(
    @Headers('region') region: string,
    @Param('type') type: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.postPageServices.exportFile(type, region);

    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/${file.type}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=MachineModel.${file.type}`,
    });

    return new StreamableFile(file.data);
  }
}
