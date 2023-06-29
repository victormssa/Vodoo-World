import { IsOptional, IsString } from 'class-validator';
import { Permission } from '../schemas/user.schemas';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly username: string;

  @IsOptional()
  @IsString()
  readonly fullname: string;

  @IsOptional()
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly cellphone: string;

  @IsOptional()
  @IsString()
  readonly permission: Permission;

  @IsOptional()
  readonly profileImage: Buffer;
}
