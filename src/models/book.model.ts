import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Book extends Model<Book> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ForeignKey(() => User)
  @Column({
    field: 'seller_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  sellerId: number;

  @BelongsTo(() => User)
  seller: User;
}
