import { createFileRoute, redirect } from '@tanstack/react-router';
import AuthMe from '../components/AuthMe.tsx';
import { getAccessToken } from '../libs/auth.ts';

export const Route = createFileRoute('/')({
  component: AuthMe,
  beforeLoad: () => {
    const accessToken = getAccessToken();
    if (accessToken) {
      return;
    }
    throw redirect({ to: '/login' });
  },
});
