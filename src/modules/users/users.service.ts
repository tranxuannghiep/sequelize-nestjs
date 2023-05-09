/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}
  async createUser(user: UserDto) {
    const result = await this.userRepository.create(user);
    const { password, ...resultUser } = result.dataValues;
    return {
      data: resultUser,
    };
  }

  async updateUser(dataUpdate: UpdateUserDto, id: number) {
    const existedUser = await this.userRepository.findOne({ where: { id } });
    if (!existedUser) throw new NotFoundException();
    const newUser = await existedUser.update({ ...dataUpdate });
    const { password, ...resultUser } = newUser.dataValues;
    return {
      data: resultUser,
    };
  }

  async getAll() {
    return await this.userRepository.findAll();
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
