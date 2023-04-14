import { Module } from '@nestjs/common';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './token.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [TokensController],
  providers: [TokensService],
})
export class TokensModule {}
