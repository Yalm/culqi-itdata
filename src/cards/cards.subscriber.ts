import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TokenCreatedEvent } from 'src/common/events';
import { CardsService } from './cards.service';

@Injectable()
export class CardsSubscriber {
  private readonly logger = new Logger(CardsSubscriber.name);

  constructor(private readonly cardsService: CardsService) {}

  @OnEvent('token.created')
  async handleTokenCreatedEvent(payload: TokenCreatedEvent) {
    try {
      await this.cardsService.create({
        source: payload,
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }
}
