import { User } from './user.interface';

export interface Token {
  accessToken: string;
}

export type AccessTokenProvider = Pick<User, 'id' | 'role'>
