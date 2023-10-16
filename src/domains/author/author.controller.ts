import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AUTH } from '../auth/decorator/auth.decorator';
import { AuthorDocument } from './schema/author.schema';
import { AuthorService } from './author.service';
import { CreateAuthorDTO } from './dto/createAuthor/createAuthor.dto';
import { Role } from '../auth/roles/permission.roles';
import { UpdateAuthorDTO } from './dto/updateAuthor/updateAuthor.dto';
@AUTH(Role.admin)
@Controller()
export class AuthorController {
  public constructor(public authorServices: AuthorService) {}

  @Get('author/:uniqueId')
  public async fetchAuthor(
    @Param('uniqueId') uniqueId: string,
  ): Promise<AuthorDocument> {
    return await this.authorServices.fetchAuthor(uniqueId);
  }

  @Post('author')
  public async createAuthor(
    @Body() body: CreateAuthorDTO,
  ): Promise<AuthorDocument> {
    return await this.authorServices.createAuthor(body);
  }

  @Put('author/:uniqueId')
  public async updateAuthor(
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateAuthorDTO,
  ): Promise<AuthorDocument> {
    return await this.authorServices.updateAuthor(uniqueId, body);
  }

  @Delete('author/:uniqueId')
  public async deleteAuthor(
    @Param('uniqueId') uniqueId: string,
  ): Promise<object> {
    return await this.authorServices.deleteAuthor(uniqueId);
  }

  @Get('authors')
  public async fetchAllAuthors(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<AuthorDocument[]> {
    return await this.authorServices.fetchAllAuthors(pageNumber, pageSize);
  }
}
