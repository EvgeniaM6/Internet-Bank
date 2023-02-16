import config from '../data/config';
import enAbout from '../data/lang/about/en';
import ruAbout from '../data/lang/about/ru';
import enAccount from '../data/lang/account/en';
import ruAccount from '../data/lang/account/ru';
import enAdmin from '../data/lang/admin/en';
import ruAdmin from '../data/lang/admin/ru';
import enAuth from '../data/lang/auth/en';
import ruAuth from '../data/lang/auth/ru';
import enCardCreator from '../data/lang/cardCreator/en';
import ruCardCreator from '../data/lang/cardCreator/ru';
import enHeader from '../data/lang/header/en';
import ruHeader from '../data/lang/header/ru';
import enPayment from '../data/lang/payment/en';
import ruPayment from '../data/lang/payment/ru';
import enStatistics from '../data/lang/statistics/en';
import ruStatistics from '../data/lang/statistics/ru';
import enStock from '../data/lang/stock/en';
import ruStock from '../data/lang/stock/ru';
import { TPageLang, TTextByLang } from '../data/servicesType';
import { EPages } from '../data/types';
import { renderPayment } from './payment/renderPayment';
import { renderPaymentDetails } from './payment/renderPaymentDetails';

const textByLangsData: TPageLang = {
  header: {
    en: enHeader,
    ru: ruHeader,
  },
  [EPages.ABOUT]: {
    en: enAbout,
    ru: ruAbout,
  },
  [EPages.ACCOUNT]: {
    en: enAccount,
    ru: ruAccount,
  },
  [EPages.ADMIN]: {
    en: enAdmin,
    ru: ruAdmin,
  },
  [EPages.AUTH]: {
    en: enAuth,
    ru: ruAuth,
  },
  [EPages.CARD_CREATOR]: {
    en: enCardCreator,
    ru: ruCardCreator,
  },
  [EPages.QUIZ]: {
    // en: enCardCreator,
    // ru: ruCardCreator,
  },
  [EPages.SERVICES]: {
    en: enPayment,
    ru: ruPayment,
  },
  [EPages.STATISTICS]: {
    en: enStatistics,
    ru: ruStatistics,
  },
  [EPages.STOCKS]: {
    en: enStock,
    ru: ruStock,
  },
};

export function switchLang(selectElem: HTMLSelectElement): void {
  config.lang = selectElem.value;

  const currLangTextData = textByLangsData[config.page][config.lang];
  updateTextByClass(currLangTextData);

  if (config.page === EPages.SERVICES) {
    renderPayment.updatePaymentCardsText();
    renderPaymentDetails.updatePaymentText();
  } else if (config.page === EPages.STATISTICS) {
    const elemsWithLangAttrList = document.querySelectorAll(`[runame]`);
    Array.from(elemsWithLangAttrList).forEach((elem) => {
      elem.textContent = config.lang === 'en' ? elem.getAttribute('enname') : elem.getAttribute('runame');
    });
  }

  const header = document.querySelector(`.header`) as HTMLElement;
  if (header) {
    const currLangTextHeaderData = textByLangsData.header[config.lang];
    updateTextByClass(currLangTextHeaderData);
  }
  //   const langBtn = document.querySelector(`.header__lang-btn`) as HTMLElement;
  //   if (!langBtn) return;
  //   langBtn.textContent = textByLangsData.header[config.lang]['header__lang-btn'];
  // }
}

function updateTextByClass(currLangTextData: TTextByLang) {
  Object.keys(currLangTextData).forEach((key) => {
    const elemsArr = document.querySelectorAll(`.${key}`);
    if (!elemsArr) return;

    const text = currLangTextData[key];

    Array.from(elemsArr).forEach((elem) => {
      elem.textContent = text;
    });
  });
}
