export enum EPages {
  AUTH = 'auth',
  ABOUT = 'About',
  SERVICES = 'Services',
  ACCOUNT = 'Account',
  QUIZ = 'Quiz',
  STATISTICS = 'Statistics',
  CARD_CREATOR = 'Card Creator',
}

export enum EOperation {
  ADD = 'add',
  REMOVE = 'remove',
}

export enum EMethod {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export enum EAdminInfo {
  DATABASE = 'database',
  BANK = 'bank',
}

export interface IMainRes {
  success: boolean;
  message: string;
}

export interface IAfterReg extends IMainRes {
  pinCode?: number;
}

export interface IUserConfig {
  username: string;
  money?: number;
  email?: string;
  isAdmin: boolean;
  isBlock: boolean;
}

// Check
export interface IUser extends IUserConfig {
  lastFive: object[];
}

export interface IVerify extends IMainRes {
  token?: string;
  userConfig?: IUserConfig;
}

export interface IUserInfo extends IMainRes {
  userConfig?: IUser;
}

export interface ICommission extends IMainRes {
  moneyPay: number;
  commission: number;
}

export interface IBankAccount {
  bankname: string;
  money: number;
}

export interface IBank extends IMainRes {
  bank: IBankAccount;
}

export interface IUserDatabase extends IMainRes {
  database: IUserConfig[];
}

export interface IStatistics {
  operationID: number;
  count: number;
  money: number;
}

export interface IGetStatistics extends IMainRes {
  result?: IStatistics[];
}

export interface IOperation {
  name: string;
  ruName: string;
  category: string;
  logo?: string;
}

export interface IOperationList {
  [index: number]: IOperation;
}

export interface IOperationRes extends IMainRes {
  operations?: IOperationList;
}
