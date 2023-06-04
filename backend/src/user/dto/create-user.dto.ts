import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Permission } from '../schemas/user.schemas';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsString()
  readonly cellphone: string;

  @IsNotEmpty()
  @IsEnum(Permission, { message: 'Please enter correct permission.' })
  readonly category: Permission;
}
