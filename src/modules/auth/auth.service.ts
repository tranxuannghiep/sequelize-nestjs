import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/core/utils/bcrypt';
import { User } from '../users/user.modal';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const existedUser = await this.usersService.findOne(email);
    if (!existedUser) return null;

    const isMatch = await comparePassword(password, existedUser.password);
    if (!isMatch) return null;

    return existedUser;
  }

  async login(user: User) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
