import { ValidationPipe } from '@nestjs/common';
import { CreateTokenDTO } from './create-token.dto';

describe('CreateTokenDTO', () => {
  const validationPipe = new ValidationPipe();

  it('should return a validation error in the email', () => {
    const mockToken = {
      email: 'renzo@yopmail.com',
    };
    expect(
      validationPipe.transform(mockToken, {
        metatype: CreateTokenDTO,
        type: 'body',
      }),
    ).rejects.toThrow();
  });

  it('should return a validation error in the card_number', () => {
    const mockToken = {
      card_number: '411111111111111111111111111111',
    };
    expect(
      validationPipe.transform(mockToken, {
        metatype: CreateTokenDTO,
        type: 'body',
      }),
    ).rejects.toThrow();
  });

  it('should not return any error', () => {
    const mockToken = {
      email: 'renzomanuelc@gmail.com',
      card_number: '4111111111111111',
      cvv: '123',
      expiration_year: '2028',
      expiration_month: '12',
    };
    expect(
      validationPipe.transform(mockToken, {
        metatype: CreateTokenDTO,
        type: 'body',
      }),
    ).resolves.not.toThrow();
  });
});
