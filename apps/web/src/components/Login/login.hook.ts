import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpcClient } from '@lib/trpc-client/trpc-client.ts';
import { saveAccessToken } from '../../libs/auth.ts';
import { useRouter } from '@tanstack/react-router';

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export const useLogin = () => {
  const router = useRouter();
  const signUp = trpcClient.auth.signIn.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const token = await signUp.mutateAsync(data);
    saveAccessToken(token.accessToken);
    router.navigate({ to: '/' });
  };

  return { errors, handleSubmit, onSubmit, register };
};
