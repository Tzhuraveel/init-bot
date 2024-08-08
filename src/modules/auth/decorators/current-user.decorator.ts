import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@telegram-apps/init-data-node';

export const WebAppUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();

    return request.initData.user;
  },
);
