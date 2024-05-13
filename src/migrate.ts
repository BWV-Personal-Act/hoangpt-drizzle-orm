import 'dotenv/config';

import { migrate } from 'drizzle-orm/mysql2/migrator';

import { connection, db } from './db';

(async () => {
  await migrate(db, { migrationsFolder: './drizzle' });

  connection.end();
})();
