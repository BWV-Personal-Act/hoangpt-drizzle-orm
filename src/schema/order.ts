import { bigint, datetime, mysqlTable } from 'drizzle-orm/mysql-core';
import { idField, timestampFields } from './_common';
import { customer } from './customer';

export const order = mysqlTable('order', {
  ...idField(),
  customerId: bigint('customer_id', { mode: 'number', unsigned: true })
    .notNull()
    .references(() => customer.id),
  orderDate: datetime('order_date').notNull(),
  ...timestampFields(),
});
