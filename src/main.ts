import express from 'express';

import { db } from './db';
import router from './routes';

const PORT = process.env.PORT || 3000;

async function main() {
  const app = express();

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ limit: '1mb', extended: true }));

  app.use('/api', router(db));

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

main();
