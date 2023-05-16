import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  HasMany,
} from 'sequelize-typescript';
import { Role, Gender } from 'src/core/utils';
import { encodePassword } from 'src/core/utils/bcrypt';
import { Book } from './book.model';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Email address is not valid',
      },
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: [Gender.Male, Gender.Female],
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.ENUM,
    values: [Role.Admin, Role.Seller, Role.Customer],
    allowNull: false,
    defaultValue: Role.Customer,
  })
  role: string;

  @HasMany(() => Book)
  book: Book[];

  @BeforeCreate
  @BeforeUpdate
  public static async hashPassword(user: User) {
    if (user.password) {
      user.password = await encodePassword(user.password);
    }
  }
}
