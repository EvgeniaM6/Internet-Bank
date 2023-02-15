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
  category: TTextByLang;
  logo?: string;
};

export type TElemsForUpdateText = {
  [key: string]: HTMLElement;
};

export type TOperationInputData = {
  [key: string]: TInputData[];
};

export type TInputData = {
  name: string;
  inputType: string;
  optionDefalt?: TTextByLang;
  regex?: string;
  placeholder: string;
  hint: TTextByLang;
  labelText: TTextByLang;
  maxLeng?: number;
};

export type TTextByLang = {
  [key: string]: string;
};

type TTexts = {
  [key: string]: string;
};

export type TLang = {
  [key: string]: TTextByLang;
};

export type TPageLang = {
  [page: string]: TLang;
};

export type TAccOptions = {
  name: TTextByLang;
  isDisabled: boolean;
};

export type TPaymentDetails = {
  userTo?: string;
  operationId: number;
  operationSum: number;
  currFrom?: string;
  currTo?: string;
};
