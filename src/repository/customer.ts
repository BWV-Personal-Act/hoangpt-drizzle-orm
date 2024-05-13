import * as drz from 'drizzle-orm';

import { ICustomerSearchParams } from '../factory/customer';
import { BaseRepository } from './_base';

export class CustomerRepository extends BaseRepository {
  public declare readonly model: Models['customer'];

  constructor(db: Drz) {
    super(db, 'customer');
  }

  public async search(params: ICustomerSearchParams) {
    const { offset, limit } = this.getOffsetLimit();
    const condition: (drz.SQLWrapper | undefined)[] = [];

    if (params.id) {
      condition.push(drz.eq(this.model.id, params.id));
    }

    if (params.name) {
      condition.push(drz.like(this.model.name, `%${params.name}%`));
    }

    if (params.email) {
      condition.push(drz.like(this.model.email, `%${params.email}%`));
    }

    if (params.phone) {
      condition.push(drz.like(this.model.phone, `%${params.phone}%`));
    }

    return this.getSearchResult(
      this.db
        .select()
        .from(this.model)
        .leftJoin(
          this.models.order,
          drz.eq(this.models.order.customerId, this.model.id),
        )
        .leftJoin(
          this.models.orderDetail,
          drz.eq(this.models.orderDetail.orderId, this.models.order.id),
        )
        .where(drz.and(...condition))
        .orderBy(drz.asc(this.model.id))
        .offset(offset)
        .limit(limit),
      this.count().where(drz.and(...condition)),
    );
  }

  public async searchId(id: number) {
    const [customer] = await this.db
      .select()
      .from(this.model)
      .where(drz.eq(this.model.id, id));

    if (!customer) {
      throw new Error(`Not found user.id = ${id}`);
    }

    return customer;
  }

  public async create(params: any) {
    const data = {
      ...params,
      createdBy: 1,
      createdUserName: 'Admin',
      updatedBy: 1,
      updatedUserName: 'Admin',
    };

    await this.db.transaction(async (tx: any) => {
      try {
        const user = await tx.insert(this.model).values(data);

        return user[0].insertId;
      } catch (error) {
        await tx.rollback();
        throw error;
      }
    });
  }

  public async updated(params: any, id: number) {
    const data = {
      ...params,
      updatedAt: new Date(),
      updatedBy: 1,
      updatedUserName: 'Admin',
    };

    await this.db.transaction(async (tx: any) => {
      try {
        await tx.update(this.model).set(data).where(drz.eq(this.model.id, id));
      } catch (error) {
        await tx.rollback();
        throw error;
      }
    });
  }

  public async delete(id: number) {
    await this.db.transaction(async (tx: any) => {
      try {
        await tx.delete(this.model).where(drz.eq(this.model.id, id));
      } catch (error) {
        await tx.rollback();
        throw error;
      }
    });
  }
}
