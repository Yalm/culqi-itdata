import { IsMongoId } from 'class-validator';

export class FindOneCard {
  @IsMongoId()
  token: string;
}
