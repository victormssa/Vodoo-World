import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(query: Query): Promise<User[]> {
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          fullname: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const users = await this.userModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return users;
  }

  async create(user: User): Promise<User> {
    const res = await this.userModel.create(user);
    return res;
  }

  async findById(id: string): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id);

    const user = await this.userModel.findById(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter an valid id.');
    }

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async updateById(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
