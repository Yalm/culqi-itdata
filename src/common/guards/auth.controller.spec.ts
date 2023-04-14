import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

describe('AuthGuard', () => {
  const authGuard = new AuthGuard();

  it('should return deny when sending the empty token', () => {
    const mockContext = createMock<ExecutionContext>();

    expect(authGuard.canActivate(mockContext)).toBe(false);
  });

  it('should return allow when sending the token', async () => {
    const mockContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer sk_test_QUNObkhMZzRUTUZLZ1N4Uw==',
          },
        }),
      }),
    });

    expect(authGuard.canActivate(mockContext)).toBe(true);
  });
});
