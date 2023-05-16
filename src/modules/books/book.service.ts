import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from 'src/models/book.model';
import { User } from 'src/models/user.model';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book) private readonly modalBook: typeof Book) {}

  async createBook(user: User, createBookDto: CreateBookDto) {
    const { id } = user;
    return this.modalBook.create({
      ...createBookDto,
      sellerId: id,
    });
  }

  async getAllBook() {
    return this.modalBook.findAll();
  }

  async getBookById(id: number) {
    return this.modalBook.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'gender'],
        },
      ],
      attributes: {
        exclude: ['sellerId'],
      },
    });
  }
}
