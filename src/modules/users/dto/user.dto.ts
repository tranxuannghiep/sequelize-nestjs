import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from 'src/core/utils';

export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Gender, { message: 'gender invalid' })
  readonly gender: string;
}
