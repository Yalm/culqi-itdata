import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardNotFoundException } from './exceptions';

describe('CardsController', () => {
  let controller: CardsController;
  const cardsService = { findByToken: () => Promise.resolve(undefined) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useValue: cardsService,
        },
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
  });

  it('should return error', () => {
    expect(controller.findOne({ token: '' })).rejects.toThrow(
      CardNotFoundException,
    );
  });

  it('should return the card without the cvv', () => {
    jest.spyOn(cardsService, 'findByToken').mockImplementation(() =>
      Promise.resolve({
        _id: '6438a6435713b2af26d6b295',
        source: {
          card_number: '4111111111111111',
          email: 'renzomanuelc@gmail.com',
          expiration_year: '2028',
          expiration_month: '12',
          creation_date: '2023-04-14T01:02:59.492Z',
          _id: '6438a6435713b2af26d6b293',
        },
        creation_date: '2023-04-14T01:02:59.512Z',
      }),
    );

    expect(controller.findOne({ token: '' })).resolves.not.toHaveProperty(
      'source.cvv',
    );
  });
});
