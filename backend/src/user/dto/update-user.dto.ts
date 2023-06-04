import { Permission } from '../schemas/user.schemas';

export class UpdateUserDto {
  readonly username: string;

  readonly fullname: string;

  readonly email: string;

  readonly password: string;

  readonly category: Permission;
}
