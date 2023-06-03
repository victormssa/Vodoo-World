import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schemas';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
