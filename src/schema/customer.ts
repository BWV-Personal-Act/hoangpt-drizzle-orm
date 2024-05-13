import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { idField, timestampFields } from './_common';

export const customer = mysqlTable('customer', {
  ...idField(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 10 }).notNull(),
  ...timestampFields(),
});
