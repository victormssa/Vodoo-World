import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdatePetDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly age: string;

  @IsOptional()
  @IsString()
  readonly species: string;

  @IsOptional()
  @IsString()
  readonly breed: string;

  @IsOptional()
  readonly gender: string;

  @IsNotEmpty()
  readonly ownerId: string;

  @IsNotEmpty()
  readonly ownerName: string;
}
