import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Token } from '../tokens/token.entity';

export type CardDocument = HydratedDocument<Card>;

@Schema({ versionKey: false })
export class Card {
  @Prop({ default: Date.now })
  creation_date: Date;

  @Prop({ schema: Token })
  source: Token;
}

export const CardSchema = SchemaFactory.createForClass(Card);
CardSchema.index({ 'source._id': 1 });
