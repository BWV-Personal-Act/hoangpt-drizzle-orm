import { count, eq, type SelectedFields, SQL, sql } from 'drizzle-orm';
import {
  type PgColumn,
  type PgSelectBuilder,
  type PgTable,
} from 'drizzle-orm/pg-core';

/**
 * helper
 */

export const now = () => sql`(NOW() AT TIME ZONE 'Asia/Tokyo')`;

export const jsonAgg = <TSelection extends SelectedFields<PgColumn, PgTable>>(
  fields: TSelection,
  nullable = false,
  withMapper = true,
) => {
  type Result = ReturnType<PgSelectBuilder<TSelection>['from']>['_']['result'];
  const sqlChunks: SQL[] = [];
  for (const field in fields) {
    sqlChunks.push(sql`'${sql.raw(field)}', ${fields[field]}`);
  }
  const jsonBuildObject = sql`json_build_object(${sql.join(sqlChunks, sql.raw(', '))})`;
  const jsonAgg = sql<Result>`json_agg(${jsonBuildObject})`;

  const result = nullable
    ? caseWhen(
        eq(count(Object.values(fields)[0] as any), sql.raw('0')),
        sql<Result>`'[]'::json`,
        jsonAgg,
      )
    : jsonAgg;

  return withMapper ? (result.mapWith(jsonMapper()) as SQL<Result>) : result;
};

export const caseWhen = <T, X extends SQL | undefined = undefined>(
  condition: SQL,
  value1: SQL<T>,
  value2?: X,
) => {
  const sqlChunks: SQL[] = [];
  sqlChunks.push(sql`case when`);
  sqlChunks.push(condition);
  sqlChunks.push(sql`then`);
  sqlChunks.push(value1);
  if (value2 !== undefined) {
    sqlChunks.push(sql`else`);
    sqlChunks.push(value2);
  }
  sqlChunks.push(sql`end`);
  return sql.join(sqlChunks, sql.raw(' ')) as X extends SQL<infer U>
    ? SQL<T | U>
    : SQL<T | null>;
};

/**
 * mapper
 */

export const jsonMapper =
  (nullable = false) =>
  (input: any) => {
    if (input instanceof Array || input === null) return input;
    const defaultValue = nullable ? null : [];
    if (typeof input !== 'string') return defaultValue;
    try {
      return JSON.parse(input);
    } catch (_err) {
      return defaultValue;
    }
  };
