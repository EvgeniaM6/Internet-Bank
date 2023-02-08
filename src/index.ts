import router from './script/router/router';
import { buildAuth } from './script/utils/auth/buildAuth';
import { createAuth } from './script/utils/auth/createAuth';
import { buildMain } from './script/utils/main/buildMain';
import { renderPayment } from './script/utils/payment/renderPayment';
import './styles/style.scss';

//buildAuth.main();
//createAuth.login();
router.page();
router.popstate();
//createAuth.registration();
//createAuth.reset();
//createAuth.verify();

//buildMain.logHeader();
//buildMain.defaultMain();

/*window.onbeforeunload = () => {
  localStorage.removeItem('token');
};*/
// renderPayment.renderPaymentsPage();
