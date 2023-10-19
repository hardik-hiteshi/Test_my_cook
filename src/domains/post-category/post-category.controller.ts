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
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreatePostCategoryDTO } from './dto/createDto/post-category.create.dto';
import { PostCategoryDocument } from './schema/post-category.schema';
import { PostCategoryService } from './post-category.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdatePostCategoryDTO } from './dto/updateDto/post-category.update.dto';

@AUTH(Role.admin)
@Controller()
export class PostCategoryController {
  public constructor(public postCategoryServices: PostCategoryService) {}

  @Post('postCategory')
  public async createPostCategory(
    @Headers('region') region: string,
    @Body() body: CreatePostCategoryDTO,
  ): Promise<PostCategoryDocument> {
    return await this.postCategoryServices.createPostCategory(region, body);
  }

  @Get('postCategory/:uniqueId')
  public async fetchPostCategory(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<PostCategoryDocument> {
    return await this.postCategoryServices.fetchPostCategory(region, uniqueId);
  }

  @Put('postCategory/:uniqueId')
  public async updatePostCategory(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdatePostCategoryDTO,
  ): Promise<PostCategoryDocument> {
    return await this.postCategoryServices.updatePostCategory(
      region,
      uniqueId,
      body,
    );
  }

  @Delete('postCategory/:uniqueId')
  public async deletePostCategory(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<object> {
    return await this.postCategoryServices.deletePostCategory(region, uniqueId);
  }

  @Get('postCategories')
  public async fetchPostCategorys(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<PostCategoryDocument[]> {
    return await this.postCategoryServices.fetchPostCategories(region, search);
  }
}
