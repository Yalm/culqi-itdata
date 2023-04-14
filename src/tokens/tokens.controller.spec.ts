import { Test, TestingModule } from '@nestjs/testing';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

describe('TokensController', () => {
  let controller: TokensController;
  const tokensService = {
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokensController],
      providers: [
        {
          provide: TokensService,
          useValue: tokensService,
        },
      ],
    }).compile();

    controller = module.get<TokensController>(TokensController);
  });

  it('should return the created token', () => {
    const body = {
      email: 'renzomanuelc@gmail.com',
      card_number: '4111111111111111',
      cvv: '123',
      expiration_year: '2028',
      expiration_month: '12',
    };
    expect(controller.create(body)).resolves.toHaveProperty('_id');
  });
});
