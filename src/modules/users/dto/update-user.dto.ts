import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Gender } from 'src/core/utils';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Gender, { message: 'gender invalid' })
  readonly gender: string;
}
