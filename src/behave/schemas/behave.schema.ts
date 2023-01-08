import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BehaveDocument = HydratedDocument<Behave>;

@Schema({ timestamps: true })
export class Behave {
  @Prop({ unique: true })
  name: string;

  @Prop()
  points: number;
}

export const BehaveSchema = SchemaFactory.createForClass(Behave);
