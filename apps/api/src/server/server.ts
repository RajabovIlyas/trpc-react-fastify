import {fastifyTRPCPlugin, FastifyTRPCPluginOptions,} from '@trpc/server/adapters/fastify';
import {initContext} from './context';
import {AppRouter, appRouter} from './router';
import pretty from 'pino-pretty';
import pino from 'pino';
import {Config} from '../interfaces';
import {connectDB} from '../database/connect.database';
import cors from '@fastify/cors';
import fastify from 'fastify';
import {userRepository} from '../database/repositories/user.repository';
import {authUseCase} from '../usecases';

export async function createServer(config: Config) {
  const connDB = await connectDB({ config: config.database });
  const userRepo = userRepository({ db: connDB });

  const authUC = authUseCase({ config: config.server, userRepo });

  const { createContext } = initContext({
    useCases: { authUC },
    config: config.server,
  });

  const port = config.server.port ?? 3000;
  const prefix = config.server.prefix ?? '/trpc';

  const stream = pretty({
    colorize: true,
    translateTime: 'HH:MM:ss Z',
    ignore: 'pid,hostname',
  });
  const prettyLogger = pino({ level: 'debug' }, stream);

  const server = fastify({
    logger:
      config.environment === 'local' || config.environment === 'test'
        ? prettyLogger
        : true,
  });

  await server.register(cors, { origin: '*', methods: '*' });

  await server.register(fastifyTRPCPlugin, {
    prefix,
    trpcOptions: {
      router: appRouter,
      createContext,
      onError: ({ path, error }) => {
        console.error(`Error in tRPC handler on path '${path}':`, error);
      },
    } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
  });
  const stop = () => server.close();
  const start = async () => {
    try {
      await server.listen({ port });
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  return { server, start, stop };
}
