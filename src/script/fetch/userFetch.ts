import { EMethod, IAfterReg, IMainRes, IOperationRes, IUserInfo, IVerify } from '../data/types';
import Fetch from './mainFetch';

class UserFetch extends Fetch {
  async regictration(username: string, password: string, email: string) {
    const path = '/action/registration';
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    };
    const result: IAfterReg = await this.mainFetch(req, path);
    return result;
  }

  async login(username: string, password: string) {
    const path = '/action/login';
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    const result: IMainRes = await this.mainFetch(req, path);
    return result;
  }

  async verify(username: string, code: number) {
    const path = '/action/verify';
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        code,
      }),
    };
    const result: IVerify = await this.mainFetch(req, path);
    return result;
  }

  async reset(username: string, email: string) {
    const path = '/action/reset';
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
      }),
    };
    const result: IMainRes = await this.mainFetch(req, path);
    return result;
  }

  async isOurUser(username: string) {
    const path = '/action/check';
    const query = `?username=${username}`;
    const req = {
      method: 'GET',
    };
    const result: boolean = await this.mainFetch(req, path, query);
    return result;
  }

  async user(method: EMethod, token: string, username?: string, email?: string, password?: string) {
    const path = '/user';
    const req: any = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (method === EMethod.PUT) {
      req.body = {
        username,
        password,
        email,
      };
    }
    if (method === EMethod.DELETE) {
      req.body = {
        password,
      };
    }
    const result: IUserInfo = await this.mainFetch(req, path);
    return result;
  }

  async saveCard(link: string, token: string) {
    const path = '/user/card';
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: {
        link
      }
    };
    const result: IMainRes = await this.mainFetch(req, path);
    return result;
  }

  async services() {
    const path = '/action/services';
    const req = {
      method: 'GET',
    };
    const result: IOperationRes = await this.mainFetch(req, path);
    return result;
  }
}

export const userFetch = new UserFetch();
