import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Pet {
  @Prop()
  name: string;

  @Prop()
  age: string;

  @Prop()
  species: string;

  @Prop()
  breed: string;

  @Prop()
  gender: string;

  @Prop()
  ownerId: string;

  @Prop()
  ownerName: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
