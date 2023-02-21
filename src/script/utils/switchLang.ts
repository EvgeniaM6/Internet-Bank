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
import enQuiz from '../data/lang/quiz/en';
import ruQuiz from '../data/lang/quiz/ru';
import { TPageLang, TTextByLang } from '../data/models';
import { EPages } from '../data/types';
import { renderPayment } from './payment/renderPayment';
import { renderPaymentDetails } from './payment/renderPaymentDetails';
import { buildQuiz } from './quiz/buildQuiz';

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
    en: enQuiz,
    ru: ruQuiz,
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

const savedLang = localStorage.getItem('lang');
if (savedLang) {
  config.lang = savedLang;
}

export function switchLang(selectElem: HTMLSelectElement): void {
  config.lang = selectElem.value;
  localStorage.setItem('lang', config.lang);

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
  } else if (config.page === EPages.QUIZ) {
    const data = sessionStorage.getItem('quiz');
    if (data) {
      const questions = JSON.parse(data);
      const question = document.querySelector('.quiz__question');
      const quizAnswers = document.querySelector('.quiz__answers');
      const description = document.querySelector('.quiz__description');

      if (!question || !quizAnswers || !description) return;
      question.innerHTML = `${config.lang === 'en' ? questions.question.en : questions.question.ru}`;
      for (let j = 0; j < questions.answers.en.length; j++) {
        const li = document.getElementById(`ans${j + 1}`);
        if (li) li.innerHTML = `${config.lang === 'en' ? questions.answers.en[j] : questions.answers.ru[j]}`;
      }

      if (!(description.innerHTML === '')) {
        description.innerHTML = `${config.lang === 'en' ? questions.desc.en : questions.desc.ru}`;
      }

      const result = document.querySelector('.quiz__result');
      if (!result) return;

      if (!(result.innerHTML === '')) {
        const score = document.querySelector('.quiz__score_n');
        if (!score) return;
        buildQuiz.showResult(+score.innerHTML);
      }
    }
  }

  const header = document.querySelector(`.header`) as HTMLElement;
  if (!header) return;

  const currLangTextHeaderData = textByLangsData.header[config.lang];
  updateTextByClass(currLangTextHeaderData);
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
