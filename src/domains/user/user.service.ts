import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePasswordDto, UserCreateDto } from './dto';
import { UserDocument } from './schema/user.schema';
import { UserRepository } from './repository/user.repository';
@Injectable()
export class UserService {
  public constructor(private userRepo: UserRepository) {}

  public async create(body: UserCreateDto): Promise<UserDocument> {
    const user = await this.userRepo.findOne({ niceName: body.niceName });
    if (user) throw new BadRequestException('user already exist');
    body.password = await bcrypt.hash(body.password, 10);

    return await this.userRepo.create(body);
  }

  public async findOne(niceName: string): Promise<UserDocument> {
    const user = await this.userRepo.findOne({ niceName });
    if (!user) throw new NotFoundException('user not found');

    return user;
  }
  public async findAll(): Promise<UserDocument[]> {
    const users = await this.userRepo.findAll();
    if (users.length <= 0) throw new NotFoundException('user not found');

    return users;
  }
  public async findOneAndUpdate(
    user: UserDocument,
    niceName: string,
    body,
  ): Promise<UserDocument> {
    //check user role hierarchy
    const updateUser = this.userRepo.findOneAndUpdate({ niceName }, body);
    if (!updateUser) throw new NotFoundException('user not found');

    return updateUser;
  }

  public async deleteOne(user: UserDocument, niceName: string): Promise<void> {
    //check user role hierarchy
    const deleteUser = await this.userRepo.deleteOne({ niceName });
    if (!deleteUser) throw new NotFoundException('user not found');
  }

  public async updatePassword(
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
