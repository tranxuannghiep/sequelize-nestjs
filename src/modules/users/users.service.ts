/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.modal';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly modalUser: typeof User) {}
  async createUser(user: UserDto) {
    const result = await this.modalUser.create(user);
    const { password, ...resultUser } = result;
    return {
      data: resultUser,
    };
  }

  async updateUser(dataUpdate: UpdateUserDto, id: number) {
    const existedUser = await this.modalUser.findOne({ where: { id } });
    if (!existedUser) throw new NotFoundException();
    const newUser = await existedUser.update({ ...dataUpdate });
    const { password, ...resultUser } = newUser;
    return {
      data: resultUser,
    };
  }

  async getAll() {
    const listUser = await this.modalUser.findAll({
      attributes: { exclude: ['password'] },
    });
    return {
      data: listUser,
    };
  }

  async findOneById(id: number) {
    const user = await this.modalUser.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    return {
      data: user,
    };
  }

  async findOne(email: string) {
    const user = await this.modalUser.findOne({
      where: { email },
    });
    return user;
  }
}
