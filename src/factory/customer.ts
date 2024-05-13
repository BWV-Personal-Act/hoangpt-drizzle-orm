import { FormData, ICommonAttr, ICommonSearchOption } from './_common';

export interface ICustomerMainAttr {
  name: string;
  email: string;
  phone: string;
}

export interface ICustomerAttr extends ICustomerMainAttr, ICommonAttr {}

export interface ICustomerSearchParams
  extends ICustomerMainAttr,
    ICommonSearchOption {
  id: number;
}

export declare type UserForm = FormData<ICustomerMainAttr>;
