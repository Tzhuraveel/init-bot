import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';
import { Config, TelegramBotConfig } from 'src/configs/configs.type';
import { session } from 'telegraf';

@Injectable()
export class BotConnectService implements TelegrafOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  createTelegrafOptions(): TelegrafModuleOptions {
    const databaseConfig =
      this.configService.get<TelegramBotConfig>('telegramBot');

    return {
      token: databaseConfig.token,
      middlewares: [session()],
      launchOptions: {
        webhook: {
          domain: databaseConfig.domain,
          secretToken: databaseConfig.secretToken,
          path: '/telegram',
        },
      },
    };
  }
}
