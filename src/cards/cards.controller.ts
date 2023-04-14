import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { FindOneCard } from './dtos';
import { CardNotFoundException } from './exceptions';
import { AuthGuard } from '../common/guards';

@Controller('cards')
@UseGuards(AuthGuard)
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get(':token')
  async findOne(@Param() params: FindOneCard) {
    const card = await this.cardsService.findByToken(params.token);

    if (!card) {
      throw new CardNotFoundException(params.token);
    }

    return card;
  }
}
