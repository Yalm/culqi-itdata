import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { headers } = context.switchToHttp().getRequest();

    let token = '';

    if (headers.authorization) {
      token = headers.authorization.split(' ')[1];
    }

    if (!token) {
      return false;
    }

    return !!token.match(/^sk_(test|live)_/);
  }
}
