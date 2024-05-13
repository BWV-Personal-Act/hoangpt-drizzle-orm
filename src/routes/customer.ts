import { Router } from 'express';

import CustomerController from '../controllers/customer';

export default function (db: Drz) {
  const groupRouter = Router();
  const groupController = new CustomerController(db);

  groupRouter.get('/', groupController.search);
  groupRouter.get('/:id', groupController.searchId);
  groupRouter.post('/', groupController.create);
  groupRouter.put('/:id', groupController.update);
  groupRouter.delete('/:id', groupController.delete);

  return groupRouter;
}
