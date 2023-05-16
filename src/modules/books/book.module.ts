import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from 'src/models/book.model';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [SequelizeModule.forFeature([Book])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
