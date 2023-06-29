import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet } from './schemas/pet.schemas';
import { SignUpDto } from './dto/signup-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import mongoose from 'mongoose';

@Controller('/pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}
  @Get()
  async getAllPets(@Query() query: ExpressQuery): Promise<Pet[]> {
    return this.petsService.findAll(query);
  }

  @Post('/signup')
  async signUp(
    @Body()
    signUpDto: SignUpDto,
  ): Promise<{ token: string }> {
    return this.petsService.signUp(signUpDto);
  }

  @Get('/:id')
  async getPet(@Param('id') id: mongoose.Types.ObjectId) {
    const pet = await this.petsService.findById(id);
    return pet;
  }

  @Put('/:id')
  async updatePet(
    @Param('id')
    id: mongoose.Types.ObjectId,
    @Body()
    pet: UpdatePetDto,
  ): Promise<Pet> {
    return this.petsService.updateById(id, pet);
  }

  @Delete('/:id')
  async deletePet(@Param('id') id: mongoose.Types.ObjectId) {
    const pet = await this.petsService.deleteById(id);
    return pet;
  }
}
