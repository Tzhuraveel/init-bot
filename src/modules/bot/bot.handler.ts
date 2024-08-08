import { InjectBot, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Update()
export class BotHandler {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}
}
