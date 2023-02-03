import config from '../../data/config';
import { openWebSocket } from '../../fetch/webSocket';
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
    //list

    //openWebSocket();
  }

  about() {
    buildMain.about();
    //list
  }
}

export const createMain = new CreateMain();
