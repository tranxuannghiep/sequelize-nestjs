import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/core/utils';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() dataUpdate: UpdateUserDto) {
    return this.usersService.updateUser(dataUpdate, id);
  }

  @Get('/all')
  async getAll() {
    return await this.usersService.getAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.usersService.findOneById(id);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUserById(@Param('id') id: number) {
    return this.usersService.deleteUserById(id);
  }
}
