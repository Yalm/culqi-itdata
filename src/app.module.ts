import { Module } from '@nestjs/common';
import { TokensModule } from './tokens/tokens.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CardsModule } from './cards/cards.module';
import configuration from './config/configuration';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TerminusModule,
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database.mongodb'),
      inject: [ConfigService],
    }),
    TokensModule,
    CardsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
