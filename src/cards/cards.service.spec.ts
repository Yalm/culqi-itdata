import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { getModelToken } from '@nestjs/mongoose';
import { Card } from './card.entity';

describe('CardsService', () => {
  let service: CardsService;
  const cardMock = {
    _id: '6438a6435713b2af26d6b295',
    source: {
      card_number: '4111111111111111',
      email: 'renzomanuelc@gmail.com',
      expiration_year: '2028',
      expiration_month: '12',
      cvv: '123',
      creation_date: '2023-04-14T01:02:59.492Z',
      _id: '6438a6435713b2af26d6b293',
    },
    creation_date: '2023-04-14T01:02:59.512Z',
  };
  const cardModel = {
    create: () => Promise.resolve(cardMock),
    findOne: jest.fn(() => ({
      exec: () => Promise.resolve(cardMock),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Card.name),
          useValue: cardModel,
        },
        CardsService,
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the created card', () => {
    const body = {
      source: {
        card_number: '4111111111111111',
        email: 'renzomanuelc@gmail.com',
        expiration_year: '2028',
        expiration_month: '12',
        cvv: '123',
        creation_date: new Date('2023-04-14T01:02:59.492Z'),
        _id: '6438a6435713b2af26d6b293',
      },
    };
    expect(service.create(body)).resolves.toHaveProperty('_id');
  });

  it('must find the card for the token', () => {
    expect(
      service.findByToken('6438a6435713b2af26d6b295'),
    ).resolves.toHaveProperty('_id');
  });

  it('should not find any card', () => {
    jest.spyOn(cardModel, 'findOne').mockImplementation(() => ({
      exec: () => Promise.resolve(null),
    }));

    expect(service.findByToken('6438a6435713b2af26d6b296')).resolves.toBe(null);
  });
});
