import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePasswordDto, UserCreateDto, UserUpdateDto } from './dto';
import { Role } from '../auth/roles/permission.roles';
import { UserDocument } from './schema/user.schema';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  public constructor(private userRepo: UserRepository) {}

  public async create(
    body: UserCreateDto,
    region: string,
  ): Promise<UserDocument> {
    const user = await this.userRepo.findOne({
      niceName: body.niceName,
      region,
    });
    if (user) throw new BadRequestException('user already exist');
    body.password = await bcrypt.hash(body.password, 10);

    return await this.userRepo.create(body, region);
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<UserDocument> {
    const user = await this.userRepo.findOne({
      niceName,
      isActive: true,
      region,
    });
    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  public async findAll(region: string): Promise<UserDocument[]> {
    const users = await this.userRepo.findAll({ isActive: true, region });
    if (users.length <= 0) throw new NotFoundException('user not found');

    return users;
  }

  public async findOneAndUpdate(
    user: UserDocument,
    niceName: string,
    body: UserUpdateDto,
    region: string,
  ): Promise<UserDocument> {
    const updateUser = await this.userRepo.findOneAndUpdate(
      { niceName, isActive: true, region },
      body,
    );

    return await updateUser.save();
  }

  public async deleteOne(
    user: UserDocument,
    niceName: string,
    region: string,
  ): Promise<void> {
    //check user role hierarchy
    const deleteUser = await this.userRepo.deleteOne({
      niceName,
      isActive: true,
      role: Role.user,
      region,
    });
    if (!deleteUser) throw new NotFoundException('user not found');
  }

  public async updatePassword(
    user: UserDocument,
    body: UpdatePasswordDto,
  ): Promise<void> {
    if (body.currentPassword === body.newPassword)
      throw new BadRequestException(
        'new password and old password cannot be same',
      );
    const currentUser = await this.userRepo.findOne({
      niceName: user.niceName,
      isActive: true,
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
