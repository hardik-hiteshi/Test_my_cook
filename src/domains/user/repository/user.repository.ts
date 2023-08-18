import { User, UserDocument } from '../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
export class UserRepository {
  public constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  public async findOne(query: Partial<User>): Promise<UserDocument> {
    return await this.UserModel.findOne(query);
  }
  public async create(body): Promise<UserDocument> {
    return await this.UserModel.create(body);
  }

  public async findAll(): Promise<UserDocument[]> {
    return await this.UserModel.find();
  }
  public async findOneAndUpdate(
    query: Partial<User>,
    body,
  ): Promise<UserDocument> {
    return await this.UserModel.findOneAndUpdate(query, body).select(
      '-password',
    );
  }

  public async deleteOne(query: Partial<User>): Promise<UserDocument> {
    return await this.UserModel.findOneAndDelete(query);
  }
}

// {
//   size: number;
//   [name: string]: string|number;
// }
