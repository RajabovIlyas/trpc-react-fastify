import { getConfig } from './configs';
import { createServer } from './server/server';
import { NODE_ENV } from './constants';

async function main() {
  const server = await createServer(getConfig(NODE_ENV));

  try {
    await server.start();
  } catch (err: unknown) {
    if(err instanceof Error){
      await server.stop();
    }
  }
}

main();
