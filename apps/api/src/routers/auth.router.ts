import { noAuthProcedure, procedure, router } from '../server/trpc';
import { saveUserInputSchema } from '../schemas/save-user-input.schema';
import { signInInputSchema } from '../schemas/sign-in-input.schema';

export const authRouter = router({
  signUp: noAuthProcedure
    .input(saveUserInputSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.useCases.authUC.signUp(input);
    }),
  signIn: noAuthProcedure
    .input(signInInputSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.useCases.authUC.signIn(input);
    }),
  authMe: procedure.query(({ ctx }) => {
    return ctx.useCases.authUC.authMe(ctx.user);
  }),
  hello: noAuthProcedure.query(() => {
    return { message: 'Hello World!' };
  }),
});
