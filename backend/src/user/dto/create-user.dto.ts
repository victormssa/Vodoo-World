import { Permission } from '../schemas/user.schemas';

export class CreateUserDto {
  readonly username: string;

  readonly fullname: string;

  readonly email: string;

  readonly password: string;

  readonly category: Permission;
}
