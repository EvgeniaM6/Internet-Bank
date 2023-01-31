import { IMainRes } from './types';

export interface TServices extends IMainRes {
  operaionID: TServiceDetails;
}

type TServiceDetails = {
  name: string;
  ruName: string;
  category: string;
  logo?: string;
};
