import { FC, ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpcClient as trpc } from '@lib/trpc-client/trpc-client';
import { getAccessToken } from './auth.ts';

interface TRPCClientProviderProps {
  url: string;
  children?: ReactNode;
}

const headers = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return {};
  }
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

const TRPCClientProvider: FC<TRPCClientProviderProps> = ({ url, children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url,
          headers,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default TRPCClientProvider;
