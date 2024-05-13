import { bigint, int, mysqlTable } from 'drizzle-orm/mysql-core';
import { idField, timestampFields } from './_common';

export const inventory = mysqlTable('inventory', {
  ...idField(),
  productId: bigint('product_id', { mode: 'number', unsigned: true }).notNull(),
  quantity: int('quantity').notNull(),
  ...timestampFields(),
});
