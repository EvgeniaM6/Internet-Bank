import { IMainRes } from './types';

export interface IServices extends IMainRes {
  operations: IServiceObj;
}

export interface IServiceObj {
  [operaionID: string]: TServiceDetails;
}

export type TServiceDetails = {
  name: string;
  ruName: string;
  category: string;
  logo?: string;
};

export type TElemsForUpdateText = {
  [key: string]: HTMLElement;
};

export type TOperationInputData = {
  [key: string]: TInputData;
};

type TInputData = {
  regex: string;
  placeholder: string;
  hint: TTextByLang;
  labelText: TTextByLang;
};

type TTextByLang = {
  [key: string]: string;
};

type TTexts = {
  [key: string]: string;
};

export type TLang = {
  [key: string]: TTexts;
};
