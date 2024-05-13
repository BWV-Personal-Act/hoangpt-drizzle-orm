import { count } from 'drizzle-orm';

import * as allSchema from '../schema';
import { now } from '../utils/sql';

export abstract class BaseRepository {
  public readonly db: Drz;
  public readonly models = allSchema;
  public readonly model: Model;

  constructor(db: Drz, modelName: ModelName) {
    this.db = db;
    this.model = allSchema[modelName];
  }

  protected getOffsetLimit(option?: {
    offset?: string | number | null;
    limit?: string | number | null;
  }) {
    let offset = 0;
    let limit: null | number = null;
    if (option !== undefined) {
      if (!isNaN(Number(option.offset)) && option.offset !== '') {
        offset = Number(option.offset);
      }

      if (!isNaN(Number(option.limit)) && option.limit !== '') {
        limit = Number(option.limit);
      }
    }

    return { limit: limit as unknown as number, offset };
  }

  protected count() {
    return this.db.select({ count: count(this.model.id) }).from(this.model);
  }

  protected async getSearchResult<T>(
    promise1: Promise<T>,
    promise2: Promise<{ count: number }[] | { count: number }>,
  ) {
    const [data, count] = await Promise.all([promise1, promise2]);
    return {
      data,
      count: count instanceof Array ? count[0].count : count.count,
    };
  }

  protected setCommon<T extends 'update' | 'create'>(userInfo: any, mode?: T) {
    const updateInfo = {
      updatedAt: now(),
      updatedBy: userInfo.id,
      updatedUserName: userInfo.userName,
    };
    const createInfo = {
      createdBy: userInfo.id,
      createdUserName: userInfo.userName,
    };

    return {
      ...updateInfo,
      ...(mode === 'create' ? createInfo : {}),
    } as T extends 'create'
      ? typeof updateInfo & typeof createInfo
      : typeof updateInfo;
  }
}
