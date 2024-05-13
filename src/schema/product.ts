import {
  bigint,
  decimal,
  mysqlTable,
  text,
  varchar,
} from 'drizzle-orm/mysql-core';
import { idField, timestampFields } from './_common';
import { supplier } from './supplier';
import { category } from './category';

export const product = mysqlTable('product', {
  ...idField(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  supplierId: bigint('supplier_id', { mode: 'number', unsigned: true })
    .notNull()
    .references(() => supplier.id, {
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }),
  categoryId: bigint('category_id', { mode: 'number', unsigned: true })
    .notNull()
    .references(() => category.id, {
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }),
  ...timestampFields(),
});
