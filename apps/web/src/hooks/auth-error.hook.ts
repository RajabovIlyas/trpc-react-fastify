import { useRouter } from '@tanstack/react-router';
import { UNAUTHORIZED } from '../constants';
import { removeAccessToken } from '../libs/auth.ts';
import { TRPCClientErrorLike } from '@trpc/client';
import { InferrableClientTypes } from '@trpc/server/unstable-core-do-not-import';

export const useAuthError = <T extends InferrableClientTypes>(
  error: TRPCClientErrorLike<T> | null
) => {
  const router = useRouter();
  if (error?.data?.code === UNAUTHORIZED) {
    removeAccessToken();
    router.navigate({ to: '/login' });
  }
};
