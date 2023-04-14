import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema({ versionKey: false })
export class Token {
  @Prop()
  card_number: string;

  @Prop()
  email: string;

  @Prop({ select: false })
  cvv: string;

  @Prop()
  expiration_year: string;

  @Prop()
  expiration_month: string;

  @Prop({ default: Date.now, expires: 60 })
  creation_date?: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
