import { z } from 'zod';

export const signInInputSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignInInputSchema = z.TypeOf<typeof signInInputSchema>;
