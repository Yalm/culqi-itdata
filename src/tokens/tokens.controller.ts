import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateTokenDTO } from './dtos';
import { TokensService } from './tokens.service';
import { AuthGuard } from '../common/guards';

@Controller('tokens')
@UseGuards(AuthGuard)
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  create(@Body() body: CreateTokenDTO) {
    return this.tokensService.create(body);
  }
}
