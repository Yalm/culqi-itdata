import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { CardsSubscriber } from './cards.subscriber';

describe('CardsSubscriber', () => {
  let service: CardsSubscriber;
  const cardsService = {
    create: () =>
      Promise.resolve({
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
      }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CardsService,
          useValue: cardsService,
        },
        CardsSubscriber,
      ],
    }).compile();

    service = module.get<CardsSubscriber>(CardsSubscriber);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not return error', () => {
    const body = {
      card_number: '4111111111111111',
      email: 'renzomanuelc@gmail.com',
      expiration_year: '2028',
      expiration_month: '12',
      cvv: '123',
      creation_date: new Date('2023-04-14T01:02:59.492Z'),
      _id: '6438a6435713b2af26d6b293',
    };
    expect(service.handleTokenCreatedEvent(body)).resolves.not.toThrow();
  });

  it('should return error', async () => {
    const error = jest.fn();
    jest.replaceProperty<any, any>(service, 'logger', {
      error: () => error(),
    });

    jest
      .spyOn(cardsService, 'create')
      .mockImplementation(() => Promise.reject(new Error('test')));

    await service.handleTokenCreatedEvent({
      card_number: '4111111111111111',
      email: 'renzomanuelc@gmail.com',
      expiration_year: '2028',
      expiration_month: '12',
      cvv: '123',
      creation_date: new Date('2023-04-14T01:02:59.492Z'),
    });

    expect(error).toHaveBeenCalled();
  });
});
