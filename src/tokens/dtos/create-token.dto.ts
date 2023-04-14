import { Length, IsEmail, IsString, Validate } from 'class-validator';
import { MaximumYear } from '../constraints';

export class CreateTokenDTO {
  @Length(13, 16)
  @IsString()
  card_number: string;

  @Length(3, 4)
  @IsString()
  cvv: string;

  @Length(1, 2)
  @IsString()
  expiration_month: string;

  @Length(4, 4)
  @Validate(MaximumYear)
  expiration_year: string;

  @IsEmail()
  email: string;
}
