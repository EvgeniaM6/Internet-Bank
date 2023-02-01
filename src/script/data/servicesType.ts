import { IMainRes } from './types';

export interface IServices extends IMainRes {
  operations: IServiceObj;
}

export interface IServiceObj {
  [operaionID: string]: TServiceDetails;
}

type TServiceDetails = {
  name: string;
  ruName: string;
  category: string;
  logo?: string;
};

export type TElemsForUpdateText = {
  [key: string]: HTMLElement;
};
