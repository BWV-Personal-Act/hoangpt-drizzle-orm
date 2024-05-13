import {
  AnyMySqlColumn,
  bigint,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { user } from './user';

export const idField = () => ({
  id: bigint('id', { mode: 'number', unsigned: true })
    .autoincrement()
    .primaryKey(),
});

export const timestampFields = () => ({
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow().notNull(),
  createdBy: bigint('createdBy', { mode: 'number', unsigned: true })
    .notNull()
    .references((): AnyMySqlColumn => user.id, {
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }),
  createdUserName: varchar('createdUserName', { length: 10 }).notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow().notNull(),
  updatedBy: bigint('updatedBy', { mode: 'number', unsigned: true })
    .notNull()
    .references((): AnyMySqlColumn => user.id, {
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }),
  updatedUserName: varchar('updatedUserName', { length: 10 }).notNull(),
});
