import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthorDocument } from './schema/author.schema';
import { AuthorRepository } from './repository/author.repository';
import { CreateAuthorDTO } from './dto/createAuthor/createAuthor.dto';
import { UpdateAuthorDTO } from './dto/updateAuthor/updateAuthor.dto';

@Injectable()
export class AuthorService {
  public constructor(public authorRepo: AuthorRepository) {}

  public async createAuthor(body: CreateAuthorDTO): Promise<AuthorDocument> {
    const author = await this.authorRepo.findOne(body);
    if (!author) {
      const author = await this.authorRepo.create(body);

      return author;
    }
    throw new BadRequestException('Author already exists.');
  }

  public async fetchAuthor(uniqueId: string): Promise<AuthorDocument> {
    const author = await this.authorRepo.fetchAuthor(uniqueId);
    if (!author) {
      throw new NotFoundException('Author Not found.');
    }

    return author;
  }

  public async updateAuthor(
    uniqueId: string,
    body: UpdateAuthorDTO,
  ): Promise<AuthorDocument> {
    const updatedAuthor = await this.authorRepo.updateAuthor(uniqueId, body);
    if (!updatedAuthor) {
      throw new NotFoundException(' Updated Author not found.');
    }

    return updatedAuthor;
  }

  public async deleteAuthor(uniqueId: string): Promise<AuthorDocument> {
    const deletedAuthor = await this.authorRepo.deleteAuthor(uniqueId);
    if (!deletedAuthor) {
      throw new NotFoundException('No Author found to delete.');
    }

    return deletedAuthor;
  }

  public async fetchAllAuthors(): Promise<AuthorDocument[]> {
    const authorsList = await this.authorRepo.fetchAllAuthors();
    if (authorsList.length > 0) {
      return authorsList;
    }
    throw new NotFoundException('No Authors found in list.');
  }
}
