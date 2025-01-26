import * as fs from 'fs';
import * as yaml from 'yaml';
import { Config } from '../interfaces';
import * as path from 'node:path';

export function getConfig(environment: string): Config {
  const fileContents = fs.readFileSync(
    path.resolve(__dirname, '..', '..', 'config', `config.${environment}.yml`),
    'utf8'
  );
  return yaml.parse(fileContents);
}
