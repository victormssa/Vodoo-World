import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly age: string;

  @IsNotEmpty()
  @IsString()
  readonly species: string;

  @IsNotEmpty()
  @IsString()
  readonly breed: string;

  @IsString()
  readonly gender: string;

  @IsString()
  readonly ownerId: string;

  @IsString()
  readonly ownerName: string;
}
