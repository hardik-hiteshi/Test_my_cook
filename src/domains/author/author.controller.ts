import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorDocument } from './schema/author.schema';
import { AuthorService } from './author.service';
import { CreateAuthorDTO } from './dto/createAuthor/createAuthor.dto';
import { UpdateAuthorDTO } from './dto/updateAuthor/updateAuthor.dto';

@Controller('author')
export class AuthorController {
  public constructor(public authorServices: AuthorService) {}
  @Get(':uniqueId')
  public async fetchAuthor(
    @Param('uniqueId') uniqueId: string,
  ): Promise<AuthorDocument> {
    return await this.authorServices.fetchAuthor(uniqueId);
  }

  @Post()
  public async createAuthor(
    @Body() body: CreateAuthorDTO,
  ): Promise<AuthorDocument> {
    return await this.authorServices.createAuthor(body);
  }

  @Patch(':uniqueId')
  public async updateAuthor(
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateAuthorDTO,
  ): Promise<AuthorDocument> {
    return await this.authorServices.updateAuthor(uniqueId, body);
  }

  @Delete(':uniqueId')
  public async deleteAuthor(
    @Param('uniqueId') uniqueId: string,
  ): Promise<AuthorDocument> {
    return await this.authorServices.deleteAuthor(uniqueId);
  }

  @Get()
  public async fetchAllAuthors(): Promise<AuthorDocument[]> {
    return await this.authorServices.fetchAllAuthors();
  }
}
