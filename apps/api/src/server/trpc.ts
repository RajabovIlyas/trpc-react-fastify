import { initTRPC, TRPCError } from '@trpc/server';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AccessTokenProvider, UseCases } from '../interfaces';
import { Roles } from '../enums/role.enum';

export { AppRouter } from './router';

interface Context {
  req: FastifyRequest;
  res: FastifyReply;
  user?: AccessTokenProvider;
  useCases: UseCases;
}

const t = initTRPC.context<Context>().create();

const isAuthenticated = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

const isAdmin = t.middleware(({ next, ctx }) => {
  if (!ctx.user || ctx.user.role !== Roles.admin) {
    throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const router = t.router;

export const procedure = t.procedure.use(isAuthenticated);
export const noAuthProcedure = t.procedure;
export const adminProcedure = t.procedure.use(isAdmin);
