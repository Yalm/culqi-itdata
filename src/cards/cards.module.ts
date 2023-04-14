import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Card, CardSchema } from './card.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsSubscriber } from './cards.subscriber';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  controllers: [CardsController],
  providers: [CardsService, CardsSubscriber],
})
export class CardsModule {}
