import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';

import { BotHandler } from './bot.handler';
import { BotConnectService } from './services/bot-connect.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useClass: BotConnectService,
    }),
  ],
  providers: [BotHandler],
})
export class BotModule {}
