import { Injectable } from '@nestjs/common';
import { Card } from './card.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}

  create(card: Partial<Card>) {
    return this.cardModel.create(card);
  }

  findByToken(token: string) {
    return this.cardModel.findOne({ 'source._id': token }).exec();
  }
}
