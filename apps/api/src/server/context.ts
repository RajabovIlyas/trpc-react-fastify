import {TRPCError} from '@trpc/server';
import {verify} from 'jsonwebtoken';
import {AccessTokenProvider, ServerConfig, UseCases} from '../interfaces';
import {CreateFastifyContextOptions} from '@trpc/server/adapters/fastify';

interface InitContextProps {
  config: ServerConfig;
  useCases: UseCases;
}

export function initContext({ config, useCases }: InitContextProps) {
  async function decodeAndVerifyJwtToken(
    token: string
  ): Promise<AccessTokenProvider> {
    const decoded = verify(token, config.jwt.secretKey);
    return decoded as AccessTokenProvider;
  }
  async function createContext({ req, res }: CreateFastifyContextOptions) {
    if (req.headers.authorization) {
      try {
        const user = await decodeAndVerifyJwtToken(
          req.headers.authorization.split(' ')[1]
        );
        return { req, res, user, useCases };
      } catch (err: unknown) {
        if(err instanceof Error){
          throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
        }
      }
    }

    return { req, res, useCases };
  }

  return {
    createContext,
  };
}
