import TRPCClientProvider from './libs/TrpcClient.tsx';
import { routeTree } from './routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return (
    <TRPCClientProvider url="http://localhost:3000/trpc">
      <RouterProvider router={router} />
    </TRPCClientProvider>
  );
};

export default App;
