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
} from '@nestjs/common';
import { CreatePostTagDTO } from './dto/createDto/createPostTag.dto';
import { PostTagDocument } from './schema/postTag.schema';
import { PostTagService } from './postTag.service';
import { UpdatePostTagDTO } from './dto/updateDto/updatePostTag.dto';

@Controller()
export class PostTagController {
  public constructor(public postTagServices: PostTagService) {}

  @Post('postTag')
  public async createpostTag(
    @Headers('region') region: string,
    @Body() body: CreatePostTagDTO,
  ): Promise<PostTagDocument> {
    return await this.postTagServices.createPostTag(region, body);
  }

  @Get('postTag/:uniqueId')
  public async fetchpostTag(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<PostTagDocument> {
    return await this.postTagServices.fetchPostTag(region, uniqueId);
  }

  @Put('postTag/:uniqueId')
  public async updatepostTag(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdatePostTagDTO,
  ): Promise<PostTagDocument> {
    return await this.postTagServices.updatePostTag(region, uniqueId, body);
  }

  @Delete('postTag/:uniqueId')
  public async deletepostTag(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<PostTagDocument> {
    return await this.postTagServices.deletePostTag(region, uniqueId);
  }

  @Get('postTags')
  public async fetchpostTags(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<PostTagDocument[]> {
    return await this.postTagServices.fetchPostTags(region, search);
  }
}
