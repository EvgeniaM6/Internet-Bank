import config from '../../data/config';
import { EPages } from '../../data/types';
import { openWebSocket } from '../../fetch/webSocket';
import { buildCard } from '../cardCreator/buildCard';
import { listenCard } from '../cardCreator/listenCard';
import { buildHeader } from './buildHeader';
import { buildMain } from './buildMain';
import { listenHeader } from './listenHeader';

class CreateMain {
  header() {
    const token = sessionStorage.getItem('token');
    if (token) {
      buildHeader.logHeader();
      listenHeader.log();
      return;
    }

    buildHeader.anonimHeader();
    listenHeader.anonim();
  }

  afterLogin() {
    createMain.header();
    buildMain.about();
    config.page = EPages.ABOUT;
    //list

    //openWebSocket();
  }

  about() {
    buildMain.about();
    window.scrollTo(0, 0);
    config.page = EPages.ABOUT;
    //list
  }

  cardCreater() {
    buildCard.main();
    listenCard.main();
  }
}

export const createMain = new CreateMain();
