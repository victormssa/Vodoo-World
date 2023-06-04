import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Permission {
  ADMIN = 'Admin',
  CUSTOMER = 'Customer',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: string;

  @Prop()
  fullname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  cellphone: string;

  @Prop()
  category: Permission;
}

export const UserSchema = SchemaFactory.createForClass(User);
