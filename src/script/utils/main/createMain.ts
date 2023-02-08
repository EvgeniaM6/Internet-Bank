import { adminFetch } from '../../fetch/adminFetch';
import { openWebSocket } from '../../fetch/webSocket';
import pushState from '../../router/pushState';
import { navigationAccount } from '../account/navigationAccount';
import { navigationAdmin } from '../admin/navigationAdmin';
import { buildCard } from '../cardCreator/buildCard';
import { listenCard } from '../cardCreator/listenCard';
import { buildHeader } from './buildHeader';
import { buildMain } from './buildMain';
import { listenHeader } from './listenHeader';

class CreateMain {
  header() {
    const token = localStorage.getItem('token');
    if (token) {
      let isAsmin: boolean;
      const data = adminFetch.check(token);
      data.then((rez) => {
        isAsmin = rez.success;
        if (isAsmin) {
          buildHeader.adminHeader();
          listenHeader.log();
          return;
        }
        buildHeader.logHeader();
        listenHeader.log();
        return;
      });
    }

    buildHeader.anonimHeader();
    listenHeader.anonim();
  }

  afterLogin() {
    createMain.header();
    buildMain.about();
    pushState.about();
    //list

    openWebSocket();
  }

  about() {
    buildMain.about();
    window.scrollTo(0, 0);
    //list
  }

  cardCreater() {
    buildCard.main();
    listenCard.main();
  }

  account() {
    buildMain.account();
    navigationAccount();
  }

  admin() {
    buildMain.admin();
    navigationAdmin();
  }
}

export const createMain = new CreateMain();
