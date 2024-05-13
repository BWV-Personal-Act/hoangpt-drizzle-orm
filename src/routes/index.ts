import { Router } from 'express';

import customerRouter from './customer';

export default function (db: any) {
  const router = Router();

  router.use('/customers', customerRouter(db));

  return router;
}
