import { ConnectDB } from '../connect.database';
import { UserEntity } from '../../entities';
import { User } from '../../interfaces';

type UserRepositoryProps = {
  db: ConnectDB;
};

export type UserRepository = {
  findOne(where: Partial<User>): Promise<User | null>;
  save(saveData: Omit<User, 'id'>): Promise<User>;
};

export function userRepository({ db }: UserRepositoryProps): UserRepository {
  const userRepo = db.getRepo(UserEntity);

  return {
    findOne(where: Partial<User>) {
      return userRepo.findOne({ where });
    },
    save(saveData: Omit<User, 'id'>) {
      return userRepo.save({ ...saveData });
    },
  };
}
