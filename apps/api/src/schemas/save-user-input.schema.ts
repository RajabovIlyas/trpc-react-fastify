import { z } from 'zod';

export const saveUserInputSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type SaveUserInputSchema = z.TypeOf<typeof saveUserInputSchema>;
