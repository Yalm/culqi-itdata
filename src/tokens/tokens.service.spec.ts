import { Test, TestingModule } from '@nestjs/testing';
import { TokensService } from './tokens.service';
import { Token } from './token.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getModelToken } from '@nestjs/mongoose';

describe('TokensService', () => {
  let service: TokensService;
  const tokenModel = {
    create: () =>
      Promise.resolve({
        card_number: '4111111111111111',
        email: 'renzomanuelc@gmail.com',
        cvv: '123',
        expiration_year: '2028',
        expiration_month: '12',
        _id: '6438a6435713b2af26d6b293',
        creation_date: '2023-04-14T01:02:59.492Z',
      }),
  };
  const emit = jest.fn();

  const eventEmitter = {
    emit: () => emit(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Token.name),
          useValue: tokenModel,
        },
        {
          provide: EventEmitter2,
          useValue: eventEmitter,
        },
        TokensService,
      ],
    }).compile();

    service = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the created token', () => {
    const body = {
      email: 'renzomanuelc@gmail.com',
      card_number: '4111111111111111',
      cvv: '123',
      expiration_year: '2028',
      expiration_month: '12',
    };
    expect(service.create(body)).resolves.toHaveProperty('_id');
  });

  it('should emit the event', async () => {
    const body = {
      email: 'renzomanuelc@gmail.com',
      card_number: '4111111111111111',
      cvv: '123',
      expiration_year: '2028',
      expiration_month: '12',
    };
    await service.create(body);
    expect(emit).toHaveBeenCalled();
  });
});
