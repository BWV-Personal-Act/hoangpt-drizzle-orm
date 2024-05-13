import { mysqlTable, text, varchar } from 'drizzle-orm/mysql-core';
import { idField, timestampFields } from './_common';

export const category = mysqlTable('category', {
  ...idField(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  ...timestampFields(),
});
