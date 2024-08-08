import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Context } from 'telegraf';

import { adminIds } from '../constants/auth.constants';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = context.getArgByIndex<Context>(0);
    return adminIds.includes(ctx.from.id);
  }
}
