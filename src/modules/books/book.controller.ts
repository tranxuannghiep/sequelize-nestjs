import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Role } from 'src/core/utils';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Roles(Role.Admin, Role.Seller)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createBook(@Req() req: Request, @Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(req.user, createBookDto);
  }

  @Get('all')
  async getAllBook() {
    return this.bookService.getAllBook();
  }

  @Get(':id')
  async getBookById(@Param('id') id: number) {
    return this.bookService.getBookById(id);
  }
}
