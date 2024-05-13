import { bigint, decimal, int, mysqlTable } from 'drizzle-orm/mysql-core';
import { idField, timestampFields } from './_common';
import { order } from './order';
import { product } from './product';

export const orderDetail = mysqlTable('orderDetail', {
  ...idField(),
  orderId: bigint('order_id', { mode: 'number', unsigned: true })
    .notNull()
    .references(() => order.id),
  productId: bigint('product_id', { mode: 'number', unsigned: true })
    .notNull()
    .references(() => product.id),
  quantity: int('quantity').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  ...timestampFields(),
});
