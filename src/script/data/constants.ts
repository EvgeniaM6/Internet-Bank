import { TOperationInputData } from './servicesType';

export const INDEX_START_SERVICES = 14;

export const COMMISSION_AMOUNT = 2;
export const FRACTION_LENGTH = 2;

export const operationInputData: TOperationInputData = {
  sum: {
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
  14: {
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
  15: {
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
  16: {
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
  17: {
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
  18: {
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
  19: {
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
  20: {
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
  21: {
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
  22: {
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
  23: {
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
  24: {
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
  25: {
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
  26: {
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
  27: {
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
  28: {
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
  29: {
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
};
