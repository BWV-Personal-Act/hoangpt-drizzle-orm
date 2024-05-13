import { NextFunction, Request, Response } from 'express';

import { CustomerRepository } from '../repository/customer';
import BaseController from './_base';

class CustomerController extends BaseController {
  private readonly customerRepo: CustomerRepository;

  constructor(db: Drz) {
    super(db);
    this.customerRepo = new CustomerRepository(this.db);

    this.search = this.nextWrapper(this.search);
    this.searchId = this.nextWrapper(this.searchId);
    this.create = this.nextWrapper(this.create);
  }

  public search = async (req: Request, res: Response, _next: NextFunction) => {
    const result = await this.customerRepo.search(req.query as any);
    this.ok(res, result);
  };

  public searchId = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const result = await this.customerRepo.searchId(Number(req.params.id));
    res.json(result);
  };

  public create = async (req: Request, res: Response, _next: NextFunction) => {
    const result = await this.customerRepo.create(req.body);
    this.created(res, result);
  };

  public update = async (req: Request, res: Response, _next: NextFunction) => {
    await this.customerRepo.updated(req.body, Number(req.params.id));
    this.noContent(res);
  };

  public delete = async (req: Request, res: Response, _next: NextFunction) => {
    await this.customerRepo.delete(Number(req.params.id));
    this.noContent(res);
  };
}

export default CustomerController;
