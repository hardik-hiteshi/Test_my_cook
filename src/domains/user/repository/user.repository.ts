import { User, UserDocument } from '../schema/user.schema';
import { UserCreateDto, UserUpdateDto } from '../dto';
import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

export class UserRepository {
  public constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async findOne(
    query: RecursivePartial<User> | object,
  ): Promise<UserDocument> {
    return await this.userModel.findOne(query);
  }
  public async create(
    body: UserCreateDto,
    region: string,
  ): Promise<UserDocument> {
    return await this.userModel.create({ ...body, region });
  }

  public async findAll(
    query: RecursivePartial<User> | object,
  ): Promise<UserDocument[]> {
    return await this.userModel.find(query).lean();
  }

  public async findOneAndUpdate(
    query: RecursivePartial<User>,
    body: UserUpdateDto | UserDocument,
  ): Promise<Partial<UserDocument>> {
    if (Object.keys(body).length === 0)
      throw new BadRequestException('request body can not be empty');

    return await this.userModel
      .findOneAndUpdate(query, body, {
        new: true,
      })
      .select('-password');
  }

  public async deleteOne(query: RecursivePartial<User>): Promise<UserDocument> {
    return await this.userModel.findOneAndUpdate(query, { isActive: false });
  }
}
