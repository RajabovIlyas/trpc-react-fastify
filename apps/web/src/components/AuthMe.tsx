import { FC } from 'react';
import { trpcClient } from '@lib/trpc-client/trpc-client';
import { useAuthError } from '../hooks/auth-error.hook.ts';

const AuthMe: FC = () => {
  const user = trpcClient.auth.authMe.useQuery();

  useAuthError(user.error);

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <p>Username: {user.data?.name}</p>
        <p>Email: {user.data?.email}</p>
        <p>Role: {user.data?.role}</p>
      </div>
    </div>
  );
};

export default AuthMe;
