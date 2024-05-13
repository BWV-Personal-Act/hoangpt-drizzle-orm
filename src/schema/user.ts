import { mysqlTable, smallint, varchar } from 'drizzle-orm/mysql-core';
import { idField, timestampFields } from './_common';

export const user = mysqlTable('user', {
  ...idField(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  position: smallint('position').default(1).notNull(),
  ...timestampFields(),
});
