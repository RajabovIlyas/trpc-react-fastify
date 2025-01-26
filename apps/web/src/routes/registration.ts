import { createFileRoute } from '@tanstack/react-router';
import Registration from '../components/Registration/Registration.tsx';

export const Route = createFileRoute('/registration')({
  component: Registration,
});
