import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { parse, validate } from '@telegram-apps/init-data-node';
import { Observable } from 'rxjs';
import { TelegramBotConfig } from 'src/configs/configs.type';

@Injectable()
export class TelegramGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const initDataHash = request.headers.hash;

      if (!initDataHash) {
        return false;
      }

      const telegramBotConfig =
        this.configService.get<TelegramBotConfig>('telegramBot');

      validate(initDataHash, telegramBotConfig.token);

      request.initData = parse(initDataHash);

      return true;
    } catch (e) {
      return false;
    }
  }
}
