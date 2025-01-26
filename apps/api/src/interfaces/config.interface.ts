export interface DatabaseConfig {
  type: string;
  database: string;
}

export interface JwtConfig {
  secretKey: string;
  jwtExpiresIn: string;
}

export interface ServerConfig {
  port: number;
  prefix: string;
  jwt: JwtConfig;
}

export interface Config {
  database: DatabaseConfig;
  server: ServerConfig;
  environment: string;
}
