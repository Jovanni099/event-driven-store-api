#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/682b87e2eabd49f05c15a791d119f040ea5c06980389d1486d0b6553ba600e28/contract.js';
import startContract from '../../snapshots/682b87e2eabd49f05c15a791d119f040ea5c06980389d1486d0b6553ba600e28/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/6f15ba07ed9c2efcd717e113bf603642c14b968e57a573dc769e355639eedf0c/contract.js';
import endContractJson from '../../snapshots/6f15ba07ed9c2efcd717e113bf603642c14b968e57a573dc769e355639eedf0c/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

import postgresAdapter from '@prisma/orm-postgres/adapter/runtime';
import { sql } from '@prisma/orm-postgres/builder/runtime';
import {
  createExecutionContext,
  createSqlExecutionStack,
} from '@prisma/orm-postgres/family-runtime';
import postgresTarget, {
  PostgresContractSerializer,
} from '@prisma/orm-postgres/target/runtime';

const endContract = new PostgresContractSerializer().deserializeContract<End>(
  endContractJson,
);

const stack = createSqlExecutionStack({
  target: postgresTarget,
  adapter: postgresAdapter,
});

const db = sql<End>({
  context: createExecutionContext({
    contract: endContract,
    stack,
  }),
  rawCodecInferer: stack.adapter.rawCodecInferer,
});

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContractJson;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'OrderItem',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('lineTotal', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('orderId', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('productId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('productName', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('quantity', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('sku', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('unitPrice', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'OrderStatusHistory',
        columns: [
          col('changedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fromStatus', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('orderId', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('reason', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('toStatus', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'OrderStatusHistory_fromStatus_check_2e0eb1b3',
            "\"fromStatus\" IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED')",
          ),
          checkExpression(
            'OrderStatusHistory_toStatus_check_b4a330f1',
            "\"toStatus\" IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED')",
          ),
        ],
      }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('customerName', 'text', {
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('customerPhone', 'text', {
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('orderNumber', 'text', {
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('status', 'text', {
          notNull: true,
          default: lit('PENDING'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('subtotalAmount', 'int4', {
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('totalAmount', 'int4', {
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('updatedAt', 'timestamptz', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('currency', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-Order-currency', {
        check: () =>
          db.public.Order.select('id')
            .where((f, fns) => fns.eq(f.currency, null))
            .limit(1),
        run: () =>
          db.public.Order.update({ currency: 'KZT' }).where((f, fns) =>
            fns.eq(f.currency, null),
          ),
      }),
      this.setNotNull({ schema: 'public', table: 'Order', column: 'currency' }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('discountAmount', 'int4', {
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.dataTransform(endContract, 'backfill-Order-discountAmount', {
        check: () =>
          db.public.Order.select('id')
            .where((f, fns) => fns.eq(f.discountAmount, null))
            .limit(1),
        run: () =>
          db.public.Order.update({ discountAmount: 0 }).where((f, fns) =>
            fns.eq(f.discountAmount, null),
          ),
      }),
      this.setNotNull({
        schema: 'public',
        table: 'Order',
        column: 'discountAmount',
      }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('shippingAmount', 'int4', {
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.dataTransform(endContract, 'backfill-Order-shippingAmount', {
        check: () =>
          db.public.Order.select('id')
            .where((f, fns) => fns.eq(f.shippingAmount, null))
            .limit(1),
        run: () =>
          db.public.Order.update({ shippingAmount: 0 }).where((f, fns) =>
            fns.eq(f.shippingAmount, null),
          ),
      }),
      this.setNotNull({
        schema: 'public',
        table: 'Order',
        column: 'shippingAmount',
      }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('version', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-Order-version', {
        check: () =>
          db.public.Order.select('id')
            .where((f, fns) => fns.eq(f.version, null))
            .limit(1),
        run: () =>
          db.public.Order.update({ version: 1 }).where((f, fns) =>
            fns.eq(f.version, null),
          ),
      }),
      this.setNotNull({ schema: 'public', table: 'Order', column: 'version' }),
      this.dropNotNull({
        schema: 'public',
        table: 'Order',
        column: 'productName',
      }),
      this.dropNotNull({
        schema: 'public',
        table: 'Order',
        column: 'quantity',
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'Order',
        constraint: 'Order_status_check_90625984',
        expression:
          "\"status\" IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED')",
      }),
      this.addUnique({
        schema: 'public',
        table: 'Order',
        constraint: 'Order_orderNumber_key',
        columns: ['orderNumber'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Order',
        index: 'Order_createdAt_idx_9575dbd7',
        columns: ['createdAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Order',
        index: 'Order_customerEmail_createdAt_idx_dc6cefa1',
        columns: ['customerEmail', 'createdAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Order',
        index: 'Order_status_createdAt_idx_58610442',
        columns: ['status', 'createdAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'OrderItem',
        index: 'OrderItem_orderId_idx_d284871b',
        columns: ['orderId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'OrderItem',
        index: 'OrderItem_productId_idx_5858600a',
        columns: ['productId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'OrderStatusHistory',
        index: 'OrderStatusHistory_orderId_changedAt_idx_eabbad59',
        columns: ['orderId', 'changedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'OrderStatusHistory',
        index: 'OrderStatusHistory_orderId_idx_d284871b',
        columns: ['orderId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'OrderItem',
        foreignKey: {
          name: 'OrderItem_orderId_fkey',
          columns: ['orderId'],
          references: { schema: 'public', table: 'Order', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'OrderStatusHistory',
        foreignKey: {
          name: 'OrderStatusHistory_orderId_fkey',
          columns: ['orderId'],
          references: { schema: 'public', table: 'Order', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
