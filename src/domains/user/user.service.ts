// import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePasswordDto, UserCreateDto, UserUpdateDto } from './dto';
// import { IGetFollowindAndFlowers } from './interface/returnType.interface';
import { json2csv } from 'json-2-csv';
import { RecipeRepository } from '../recipe/repository/recipe.repository';
// import { Role } from '../auth/roles/permission.roles';
import {
  CheckPassword,
  HashPassword,
} from 'src/common/config/wordPressHasher/hash';
import { TransactionService } from 'src/common/services/transaction.service';
import { UserDocument } from './schema/user.schema';
import { UserRepository } from './repository/user.repository';
@Injectable()
export class UserService {
  public constructor(
    private userRepo: UserRepository,
    private transaction: TransactionService,
    private recipeRepo: RecipeRepository,
  ) {}

  public async create(
    body: UserCreateDto,
    region: string,
  ): Promise<UserDocument> {
    const user = await this.userRepo.findOne({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      $or: [{ niceName: body.niceName }, { 'contact.mail': body.contact.mail }],
      region,
    });
    if (user) {
      throw new BadRequestException('user email or nicename already exist');
    }
    // body.password = await bcrypt.hash(body.password, 10);
    body.password = await HashPassword(body.password);

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
    if (users.length > 0) {
      return users;
    }
    // throw new NotFoundException('user not found');

    return [];
  }

  public async findOneAndUpdate(
    user: UserDocument,
    niceName: string,
    body: UserUpdateDto,
    region: string,
  ): Promise<Partial<UserDocument>> {
    body.password = await HashPassword(body.password);
    // body.password = await bcrypt.hash(body.password, 10);
    const updateUser = await this.userRepo.findOneAndUpdate(
      { niceName, isActive: true, region },
      body,
    );

    return updateUser;
  }

  public async deleteOne(
    user: UserDocument,
    niceName: string,
    region: string,
  ): Promise<object> {
    //check user role hierarchy
    const deleteUser = await this.userRepo.deleteOne({
      niceName,
      isActive: true,
      //role: Role.user,
      region,
    });
    if (!deleteUser) throw new NotFoundException('user not found');

    return { message: 'Deleted Success' };
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

    const pwMatched = await CheckPassword(
      body.currentPassword,
      currentUser.password,
    );

    // const pwMatched = await bcrypt.compare(
    //   body.currentPassword,
    //   currentUser.password,
    // );
    if (!pwMatched) throw new BadRequestException('invalid password');

    currentUser.password = await HashPassword(body.newPassword);
    //currentUser.password = await bcrypt.hash(body.newPassword, 10);

    await currentUser.save();
  }

  // public async blockUser(
  //   region: string,
  //   niceName: string,
  //   blockUserNiceName: string,
  // ): Promise<void> {
  //   const user = await this.userRepo.findOne({
  //     isActive: true,
  //     niceName,
  //     region,
  //   });

  //   if (!user) throw new NotFoundException('user not found');

  //   if (!user.blocked) user.blocked = [];
  //   if (user.niceName === blockUserNiceName)
  //     throw new BadRequestException('You cant block yourself');

  //   if (user.blocked.includes(blockUserNiceName))
  //     throw new BadRequestException('user already blocked');

  //   const blockUser = await this.userRepo.findOne({
  //     region,
  //     niceName: blockUserNiceName,
  //     isActive: true,
  //   });

  //   if (!blockUser) throw new NotFoundException('user to be blocked not found');

  //   if (
  //     ['superadmin', 'admin', 'regionadmin', 'recipeadmin'].includes(
  //       blockUser.role,
  //     )
  //   )
  //     throw new BadRequestException('cant block admin user');

  //   const session = await this.transaction.startTransaction();

  //   try {
  //     user.blocked.push(blockUserNiceName);
  //     if (!blockUser.blockedBy) {
  //       blockUser.blockedBy = [];
  //     }
  //     blockUser.blockedBy.push(user.niceName);
  //     // Perform database operations within the transaction
  //     await user.save({ session });
  //     await blockUser.save({ session });
  //     // Commit the transaction
  //     await this.transaction.commitTransaction(session);
  //   } catch (error) {
  //     // Handle errors and rollback the transaction if needed
  //     await this.transaction.abortTransaction(session);
  //     throw error;
  //   }
  // }

  // public async unblockUser(
  //   region: string,
  //   niceName: string,
  //   blockUserNiceName: string,
  // ): Promise<void> {
  //   const user = await this.userRepo.findOne({
  //     region,
  //     niceName,
  //     isActive: true,
  //   });
  //   if (!user) throw new NotFoundException('user not found');

  //   if (!user.blocked) user.blocked = [];
  //   if (user.niceName === blockUserNiceName)
  //     throw new BadRequestException('invalid niceName of blocked user');

  //   if (!user.blocked.includes(blockUserNiceName))
  //     throw new BadRequestException('user already unblocked');

  //   const blockedUser = await this.userRepo.findOne({
  //     region,
  //     niceName: blockUserNiceName,
  //     isActive: true,
  //   });

  //   if (!blockedUser)
  //     throw new NotFoundException('user to be unblocked not found');

  //   const session = await this.transaction.startTransaction();

  //   try {
  //     user.blocked = user.blocked.filter((a) => a !== blockedUser.niceName);
  //     blockedUser.blockedBy = blockedUser.blockedBy.filter(
  //       (a) => a !== user.niceName,
  //     );
  //     // Perform database operations within the transaction
  //     await user.save({ session });
  //     await blockedUser.save({ session });
  //     // Commit the transaction
  //     await this.transaction.commitTransaction(session);
  //   } catch (error) {
  //     // Handle errors and rollback the transaction if needed
  //     await this.transaction.abortTransaction(session);
  //     throw error;
  //   }
  // }

  // public async getBlockedUsers(
  //   niceName: string,
  //   region: string,
  // ): Promise<
  //   {
  //     niceName: string;
  //     displayName: string;
  //   }[]
  // > {
  //   const user = await this.userRepo.findOne({
  //     region,
  //     niceName,
  //     isActive: true,
  //   });
  //   if (!user) throw new NotFoundException('user not found');

  //   if (user.blocked.length <= 0)
  //     throw new NotFoundException('no blocked user found');

  //   const blockedUsers = await this.userRepo.findAll({
  //     region,
  //     niceName: { $in: user.blocked },
  //     isActive: true,
  //   });
  //   if (blockedUsers.length <= 0)
  //     throw new NotFoundException('no blocked user found');
  //   const result = blockedUsers.map((a) => ({
  //     niceName: a.niceName,
  //     displayName: a.name.displayName,
  //   }));

  //   return result;
  // }

  // public async getBlockedByUsers(
  //   region: string,
  //   niceName: string,
  // ): Promise<
  //   {
  //     niceName: string;
  //     displayName: string;
  //   }[]
  // > {
  //   const user = await this.userRepo.findOne({
  //     region,
  //     niceName,
  //     isActive: true,
  //   });
  //   if (!user) throw new NotFoundException('user not found');

  //   if (user.blockedBy.length <= 0)
  //     throw new NotFoundException('no blockedBy user found');

  //   const blockedUsers = await this.userRepo.findAll({
  //     region,
  //     niceName: { $in: user.blockedBy },
  //     isActive: true,
  //   });
  //   if (blockedUsers.length <= 0)
  //     throw new NotFoundException('no blockedBy user found');
  //   const result = blockedUsers.map((a) => ({
  //     niceName: a.niceName,
  //     displayName: a.name.displayName,
  //   }));

  //   return result;
  // }

  // public async addDoneRecipe(
  //   region: string,
  //   niceName: string,
  //   recipeNiceName: string,
  //   currentUser: UserDocument,
  // ): Promise<void> {
  //   const canAdd =
  //     currentUser.niceName == niceName ||
  //     currentUser.role == 'admin' ||
  //     currentUser.role == 'superadmin';
  //   if (!canAdd) {
  //     throw new BadRequestException(
  //       `Only ${niceName} or admins can modify this recipe ${recipeNiceName}`,
  //     );
  //   }
  //   const user = await this.userRepo.findOne({
  //     region,
  //     niceName,
  //   });

  //   const recipe = await this.recipeRepo.fetchOne(region, recipeNiceName);

  //   if (!user) throw new NotFoundException('user not found');

  //   if (!recipe) throw new NotFoundException('recipe not found');

  //   const data = user.done.find(
  //     (element) => element.niceName == recipeNiceName,
  //   );

  //   if (data) {
  //     data.cooked += 1;
  //     data.lastTime = new Date();
  //   } else {
  //     user.done.push({
  //       niceName: recipeNiceName,
  //       firstTime: new Date(),
  //       lastTime: new Date(),
  //       cooked: 1,
  //     });
  //   }

  //   await user.save();
  // }

  // public async listFollowingAndFollowers(
  //   region: string,
  //   niceName: string,
  // ): Promise<IGetFollowindAndFlowers> {
  //   const user = await this.userRepo.findOne({ region, niceName });
  //   if (!user) throw new NotFoundException('user not found');

  //   const listFollowers = await this.userRepo.findAll({
  //     isActive: true,
  //     region,
  //     niceName: { $in: user.follower },
  //   });

  //   const listFollowing = await this.userRepo.findAll({
  //     region,
  //     niceName: { $in: user.following },
  //     isActive: true,
  //   });

  //   const followingArray: {
  //     niceName: string;
  //     rank: string;
  //     displayName: string;
  //   }[] = [];
  //   if (listFollowing.length > 0) {
  //     for (const f of listFollowing) {
  //       followingArray.push({
  //         niceName: f.niceName,
  //         rank: f.rank,
  //         displayName: f.name.displayName,
  //       });
  //     }
  //   }

  //   const followerArray: {
  //     niceName: string;
  //     rank: string;
  //     displayName: string;
  //   }[] = [];
  //   if (listFollowers.length > 0) {
  //     for (const f of listFollowers) {
  //       followerArray.push({
  //         niceName: f.niceName,
  //         rank: f.rank,
  //         displayName: f.name.displayName,
  //       });
  //     }
  //   }
  //   const list = {
  //     following: followingArray,
  //     followingCount: user.following.length,
  //     followers: followerArray,
  //     followersCount: listFollowers.length,
  //   };

  //   return list;
  // }

  // public async followUser(
  //   region: string,
  //   currentUser: UserDocument,
  //   niceName: string,
  //   followingNiceName: string,
  // ): Promise<void> {
  //   const canAdd =
  //     currentUser.niceName == niceName ||
  //     currentUser.role == 'admin' ||
  //     currentUser.role == 'superadmin';
  //   if (!canAdd) {
  //     throw new BadRequestException(
  //       `Only ${niceName} or admins can modify the following of ${niceName}`,
  //     );
  //   }
  //   if (niceName === followingNiceName)
  //     throw new BadRequestException('you cannot follow yourself');

  //   const user = await this.userRepo.findOne({
  //     niceName,
  //     isActive: true,
  //     region,
  //   });

  //   if (!user) throw new NotFoundException('user not found');

  //   const userToFollow = await this.userRepo.findOne({
  //     niceName: followingNiceName,
  //     region,
  //     isActive: true,
  //   });

  //   if (!userToFollow)
  //     throw new NotFoundException(
  //       `niceName ${followingNiceName} does not exist`,
  //     );

  //   if (
  //     user.following.includes(userToFollow.niceName) &&
  //     userToFollow.follower.includes(user.niceName)
  //   )
  //     throw new BadRequestException('already following the user');

  //   if (!user.following.includes(userToFollow.niceName)) {
  //     user.following.push(userToFollow.niceName);
  //   }
  //   if (!userToFollow.follower.includes(user.niceName)) {
  //     userToFollow.follower.push(user.niceName);
  //   }

  //   await user.save();
  //   await userToFollow.save();
  // }

  // public async unfollowUser(
  //   region: string,
  //   currentUser: UserDocument,
  //   niceName: string,
  //   followingNiceName: string,
  // ): Promise<void> {
  //   const canUnfollow =
  //     currentUser.niceName == niceName ||
  //     currentUser.role == 'admin' ||
  //     currentUser.role == 'superadmin';
  //   if (!canUnfollow) {
  //     throw new BadRequestException(
  //       `Only ${niceName} or admins can modify the following of ${niceName}`,
  //     );
  //   }

  //   if (niceName === followingNiceName)
  //     throw new BadRequestException(
  //       'user niceName and niceName of user to unfollow cannot be same',
  //     );

  //   const user = await this.userRepo.findOne({
  //     niceName,
  //     isActive: true,
  //     region,
  //   });

  //   if (!user) throw new NotFoundException('user not found');

  //   const userToUnfollow = await this.userRepo.findOne({
  //     niceName: followingNiceName,
  //     region,
  //     isActive: true,
  //   });

  //   if (!userToUnfollow)
  //     throw new NotFoundException(
  //       `niceName ${followingNiceName} does not exist`,
  //     );

  //   if (
  //     !user.following.includes(userToUnfollow.niceName) &&
  //     !userToUnfollow.follower.includes(user.niceName)
  //   )
  //     throw new BadRequestException('already not following the user');

  //   if (user.following.includes(userToUnfollow.niceName)) {
  //     user.following = user.following.filter(
  //       (u) => u !== userToUnfollow.niceName,
  //     );
  //   }
  //   if (userToUnfollow.follower.includes(user.niceName)) {
  //     userToUnfollow.follower.push(user.niceName);
  //     userToUnfollow.follower = userToUnfollow.follower.filter(
  //       (u) => u !== user.niceName,
  //     );
  //   }

  //   await user.save();
  //   await userToUnfollow.save();
  // }
  // public async getDraftRecipes(
  //   region: string,
  //   niceName: string,
  // ): Promise<number> {
  //   const count = await this.recipeRepo.draftRecipesCount(region, niceName);

  //   if (!count) throw new NotFoundException('draft recipe not found');

  //   return count;
  // }

  public async exportFile(
    type: string,
  ): Promise<{ data: Buffer; type: string }> {
    type = type.toLocaleLowerCase();
    const users = await this.userRepo.findAll({
      isActive: true,
    });

    if (users.length <= 0) throw new NotFoundException('user not found');
    if (type === 'csv') {
      const csv = await json2csv(users);
      const data = Buffer.from(csv);

      return { data, type };
    } else if (type === 'json') {
      const data = Buffer.from(JSON.stringify(users));

      return { data, type };
    }
    throw new BadRequestException('invalid data type');
  }
}
