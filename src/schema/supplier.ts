import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { idField, timestampFields } from './_common';

export const supplier = mysqlTable('supplier', {
  ...idField(),
  name: varchar('name', { length: 255 }).notNull(),
  contactEmail: varchar('contact_email', { length: 255 }).notNull(),
  ...timestampFields(),
});
