import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Pet } from './schemas/pet.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectModel(Pet.name)
    private petModel: mongoose.Model<Pet>,
    private jwtService: JwtService,
  ) {}

  async findAll(query: Query): Promise<Pet[]> {
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const pets = await this.petModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return pets;
  }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, age, species, breed, gender, ownerId, ownerName } = signUpDto;

    const pet = await this.petModel.create({
      name,
      age,
      species,
      breed,
      gender,
      ownerId,
      ownerName,
    });

    const token = '...';

    this.jwtService.sign({ id: pet._id });

    return { token };
  }

  async findById(id: Types.ObjectId): Promise<Pet> {
    const isValidId = Types.ObjectId.isValid(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter a valid ID.');
    }

    const pet = await this.petModel.findById(id);

    if (!pet) {
      throw new NotFoundException('Pet not found.');
    }

    return pet;
  }

  async updateById(id: mongoose.Types.ObjectId, pet: Pet): Promise<Pet> {
    return await this.petModel.findByIdAndUpdate(id, pet, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: mongoose.Types.ObjectId): Promise<Pet> {
    return await this.petModel.findByIdAndDelete(id);
  }
}
