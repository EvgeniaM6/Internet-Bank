import { TOperationInputData } from '../servicesType';

export const INDEX_START_BANK_SERVICES = 1;
export const ID_CURRENCY_REFILL_SERVICE = 3;
export const ID_CURRENCY_SELL_SERVICE = 4;
export const INDEX_START_SERVICES = 14;

export const COMMISSION_AMOUNT = 2;
export const FRACTION_LENGTH = 2;

export const operationInputData: TOperationInputData = {
  sum: [
    {
      inputType: 'number',
      regex: `^\\d+(\\.\\d\\d)?$`,
      placeholder: '10.00',
      hint: {
        en: 'sum must be more than 0.00',
        ru: 'сумма должна быть больше 0.00',
      },
      labelText: {
        en: 'Sum',
        ru: 'Сумма',
      },
    },
  ],
  1: [
    {
      inputType: 'number',
      regex: `\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}`,
      placeholder: '0000 0000 0000 0000',
      hint: {
        en: 'enter 16 digits',
        ru: 'введите 16 цифр',
      },
      labelText: {
        en: 'Card number',
        ru: 'Номер карты',
      },
    },
  ],
  2: [
    {
      inputType: 'select',
      optionDefalt: {
        en: 'Account to withdraw',
        ru: 'Счет для списания',
      },
      regex: ``,
      placeholder: '',
      hint: {
        en: '',
        ru: '',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
    {
      inputType: 'select',
      optionDefalt: {
        en: 'Account to refill',
        ru: 'Счет для пополнения',
      },
      regex: ``,
      placeholder: '',
      hint: {
        en: '',
        ru: '',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
  14: [
    {
      inputType: 'text',
      regex: `^\\+\\d{9}\\d*`,
      placeholder: '+123456789',
      hint: {
        en: 'phone number must start with "+" and have minimum 9 digits',
        ru: 'номер телефона должен начинаться U+0063 "+" и содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Phone number',
        ru: 'Номер телефона',
      },
    },
  ],
  15: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'contract number must have minimum 9 digits',
        ru: 'номер договора должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Contract number',
        ru: 'Номер договора',
      },
    },
  ],
  16: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'contract number must have minimum 9 digits',
        ru: 'номер договора должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Contract number',
        ru: 'Номер договора',
      },
    },
  ],
  17: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'account number must have minimum 9 digits',
        ru: 'номер счета должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
  18: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'account number must have minimum 9 digits',
        ru: 'номер счета должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
  19: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'account number must have minimum 9 digits',
        ru: 'номер счета должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
  20: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'account number must have minimum 9 digits',
        ru: 'номер счета должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
  21: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'account number must have minimum 9 digits',
        ru: 'номер счета должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
  22: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'account number must have minimum 9 digits',
        ru: 'номер счета должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
  23: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'account number must have minimum 9 digits',
        ru: 'номер счета должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
  24: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'account number must have minimum 9 digits',
        ru: 'номер счета должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
  25: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'account number must have minimum 9 digits',
        ru: 'номер счета должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
  26: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'account number must have minimum 9 digits',
        ru: 'номер счета должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
  27: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'account number must have minimum 9 digits',
        ru: 'номер счета должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
  28: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'account number must have minimum 9 digits',
        ru: 'номер счета должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
  29: [
    {
      inputType: 'text',
      regex: `^\\d{9}\\d*`,
      placeholder: '123456789',
      hint: {
        en: 'account number must have minimum 9 digits',
        ru: 'номер счета должен содержать минимум 9 цифр',
      },
      labelText: {
        en: 'Account number',
        ru: 'Номер счета',
      },
    },
  ],
};
