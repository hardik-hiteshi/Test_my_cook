import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto, UserCreateDto } from './dto';
@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async create(body: UserCreateDto): Promise<UserDocument> {
    const user = await this.userRepo.findOne({ niceName: body.niceName });
    if (user) throw new BadRequestException('user already exist');
    body.password = await bcrypt.hash(body.password, 10);
    return await this.userRepo.create(body);
  }

  async findOne(niceName: string): Promise<UserDocument> {
    const user = await this.userRepo.findOne({ niceName });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }
  async findAll(): Promise<UserDocument[]> {
    const users = await this.userRepo.findAll();
    if (users.length <= 0) throw new NotFoundException('user not found');
    return users;
  }
  async findOneAndUpdate(
    user: UserDocument,
    niceName: string,
    body,
  ): Promise<UserDocument> {
    //check user role hierarchy
    const updateUser = this.userRepo.findOneAndUpdate({ niceName }, body);
    if (!updateUser) throw new NotFoundException('user not found');

    return updateUser;
  }

  async deleteOne(user: UserDocument, niceName: string): Promise<void> {
    //check user role hierarchy
    let deleteUser = await this.userRepo.deleteOne({ niceName });
    if (!deleteUser) throw new NotFoundException('user not found');
  }

  async updatePassword(
    user: UserDocument,
    body: UpdatePasswordDto,
  ): Promise<void> {
    const currentUser = await this.userRepo.findOne({
      niceName: user.niceName,
    });

    if (!currentUser) throw new NotFoundException('user not found');
    const pwMatched = await bcrypt.compare(
      body.currentPassword,
      currentUser.password,
    );
    if (!pwMatched) throw new BadRequestException('invalid password');

    currentUser.password = await bcrypt.hash(body.newPassword, 10);

    await currentUser.save();
  }
}
