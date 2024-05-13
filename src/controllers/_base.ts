import { NextFunction, Request, Response } from 'express';
import { CREATED, NO_CONTENT } from 'http-status';

/**
 * Base controller class for all other controller
 * Contain common method and property
 */
export default abstract class BaseController {
  protected readonly db: Drz;

  constructor(db: Drz) {
    this.db = db;
  }

  protected ok(res: Response, data: { data: any; count?: number }) {
    if (data.count !== undefined) {
      res.setHeader('X-Total-Count', data.count);
    }

    res.json(data.data);
  }

  protected created(res: Response, result?: any) {
    if (result !== undefined) {
      res.status(CREATED).json(result);
    } else {
      res.status(CREATED).send();
    }
  }

  protected noContent(res: Response) {
    res.status(NO_CONTENT).send();
  }

  protected nextWrapper(
    mainFunction: (
      req: Request,
      res: Response,
      next?: NextFunction,
    ) => Promise<void>,
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await mainFunction(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }

  protected getOffsetLimit(req: Request) {
    return {
      offset: <string>req.query.offset,
      limit: <string>req.query.limit,
    };
  }
}
