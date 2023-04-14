import { Injectable } from '@nestjs/common';
import { Token } from './token.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTokenDTO } from './dtos';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createTokenDto: CreateTokenDTO): Promise<Token> {
    const token = await this.tokenModel.create(createTokenDto);
    this.eventEmitter.emit('token.created', token);
    return token;
  }
}
