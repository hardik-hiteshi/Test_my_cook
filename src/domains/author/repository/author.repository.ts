import { Author, AuthorDocument } from '../schema/author.schema';
import { CreateAuthorDTO } from '../dto/createAuthor/createAuthor.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAuthorDTO } from '../dto/updateAuthor/updateAuthor.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthorRepository {
  public constructor(
    @InjectModel(Author.name) public authorModel: Model<Author>,
  ) {}

  public async findOne(body: CreateAuthorDTO): Promise<AuthorDocument> {
    const author = await this.authorModel.findOne({
      ...body,
      isActive: true,
    });

    return author;
  }

  public async create(body: CreateAuthorDTO): Promise<AuthorDocument> {
    const author = await this.authorModel.create({
      ...body,
      uniqueId: uuid(),
    });

    return author;
  }

  public async fetchAuthor(uniqueId: string): Promise<AuthorDocument> {
    const author = await this.authorModel.findOne({
      uniqueId,
      isActive: true,
    });

    return author;
  }

  public async updateAuthor(
    uniqueId: string,
    body: UpdateAuthorDTO,
  ): Promise<AuthorDocument> {
    const updatedAuthor = await this.authorModel.findOneAndUpdate(
      { uniqueId, isActive: true },
      body,
      { new: true },
    );

    return updatedAuthor;
  }

  public async deleteAuthor(uniqueId: string): Promise<AuthorDocument> {
    const deletedAuthor = await this.authorModel.findOneAndUpdate(
      { uniqueId, isActive: true },
      { isActive: false },
      { new: true },
    );

    return deletedAuthor;
  }

  public async fetchAllAuthors(
    pageNumber: number,
    pageSize: number,
  ): Promise<AuthorDocument[]> {
    const skipAmount = (pageNumber - 1) * pageSize;
    const authorsList = await this.authorModel
      .find({ isActive: true })
      .skip(skipAmount)
      .limit(pageSize);

    return authorsList;
  }
}
