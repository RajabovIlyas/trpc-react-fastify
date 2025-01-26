import 'reflect-metadata';
import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

import { DatabaseConfig } from '../interfaces';
import { UserEntity } from '../entities';

type ConnectDBProps = {
  config: DatabaseConfig;
};

export type ConnectDB = {
  getRepo<T extends ObjectLiteral>(target: EntityTarget<T>): Repository<T>;
};

export async function connectDB({
  config,
}: ConnectDBProps): Promise<ConnectDB> {
  const appDataSource = new DataSource({
    type: 'sqlite',
    database: config.database,
    entities: [UserEntity],
    migrations: [UserEntity],
    synchronize: true,
  });
  await appDataSource.initialize();

  return {
    getRepo<T extends ObjectLiteral>(target: EntityTarget<T>): Repository<T> {
      return appDataSource.getRepository(target);
    },
  };
}
