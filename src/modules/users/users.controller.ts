import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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
}
