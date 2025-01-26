import { UserRepository } from '../database/repositories/user.repository';
import { AccessTokenProvider, ServerConfig, Token, User } from '../interfaces';
import { TRPCError } from '@trpc/server';
import { Roles } from '../enums';
import { SaveUserInputSchema, SignInInputSchema } from '../schemas';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

type AuthUseCaseProps = {
  userRepo: UserRepository;
  config: ServerConfig;
};

export type AuthUseCase = {
  signIn(signInInput: SignInInputSchema): Promise<Token>;
  signUp(save: SignInInputSchema): Promise<Token>;
  authMe(tokenProvider: AccessTokenProvider): Promise<User>;
};

export function authUseCase({
  userRepo,
  config,
}: AuthUseCaseProps): AuthUseCase {
  return {
    async signIn({ email, password }: SignInInputSchema): Promise<Token> {
      const foundUser = await userRepo.findOne({ email });
      const error = new TRPCError({
        message: 'Incorrect email or password',
        code: 'UNAUTHORIZED',
      });
      if (!foundUser) {
        throw error;
      }

      const result = await compare(password, foundUser.password);

      if (!result) {
        throw error;
      }

      return {
        accessToken: sign(
          {
            id: foundUser.id,
            roles: foundUser.role,
          },
          config.jwt.secretKey,
          { expiresIn: config.jwt.jwtExpiresIn }
        ),
      };
    },
    async signUp(save: SaveUserInputSchema): Promise<Token> {
      const newUser = {
        ...save,
        password: await hash(save.password, 10),
        role: Roles.user,
      };
      const savedUser = await userRepo.save(newUser);

      return {
        accessToken: sign(
          {
            id: savedUser.id,
            roles: savedUser.role,
          },
          config.jwt.secretKey,
          { expiresIn: config.jwt.jwtExpiresIn }
        ),
      };
    },
    async authMe(tokenProvider: AccessTokenProvider): Promise<User> {
      const foundUser = await userRepo.findOne({ id: tokenProvider.id });
      if (!foundUser) {
        throw new TRPCError({
          message: 'Unauthorized',
          code: 'UNAUTHORIZED',
        });
      }
      return foundUser;
    },
  };
}
