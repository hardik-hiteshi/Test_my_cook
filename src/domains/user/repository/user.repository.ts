import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
export class UserRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async findOne(query: Partial<User>): Promise<UserDocument> {
    return await this.UserModel.findOne(query);
  }
  async create(body): Promise<UserDocument> {
    return await this.UserModel.create(body);
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.UserModel.find();
  }
  async findOneAndUpdate(query: Partial<User>, body): Promise<UserDocument> {
    return await this.UserModel.findOneAndUpdate(query, body).select(
      '-password',
    );
  }

  async deleteOne(query: Partial<User>): Promise<UserDocument> {
    return await this.UserModel.findOneAndDelete(query);
  }
}

// {
//   size: number;
//   [name: string]: string|number;
// }
