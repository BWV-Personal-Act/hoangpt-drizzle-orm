import { drizzle as dataApiDrz } from 'drizzle-orm/aws-data-api/pg';
import { drizzle as mysqlDrz } from 'drizzle-orm/mysql-core';

import { IUserInfo } from '../factory/auth';
import * as allSchema from '../schema';

declare global {
  namespace Express {
    interface User extends IUserInfo {}
    export interface Request {
      user: User;
    }
  }

  type Drz = ReturnType<typeof dataApiDrz> | ReturnType<typeof mysqlDrz>;
  type MysqlDrz = ReturnType<typeof mysqlDrz>;
  type Models = typeof allSchema;
  type ModelName = keyof Models;
  type Model = Models[ModelName];
}
