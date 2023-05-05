import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}
  async createUser(user: UserDto) {
    return this.userRepository.create(user);
  }

  async getAll() {
    return await this.userRepository.findAll();
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
