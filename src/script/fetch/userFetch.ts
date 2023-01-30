import { EMethod, IMainRes, IUserInfo, IVerify } from '../data/types';
import Fetch from './mainFetch';

class UserFetch extends Fetch {
  async regictration(username: string, password: string, email: string) {
    const path = '/user/registration';
    const req = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    };
    const result: IMainRes = await this.mainFetch(req, path);
    return result;
  }

  async login(username: string, password: string) {
    const path = '/user/login';
    const req = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    };
    const result: IMainRes = await this.mainFetch(req, path);
    return result;
  }

  async verify(username: string, code: number) {
    const path = '/user/verify';
    const req = {
      method: 'POST',
      body: JSON.stringify({
        username,
        code,
      }),
    };
    const result: IMainRes | IVerify = await this.mainFetch(req, path);
    return result;
  }

  async reset(username: string, email: string) {
    const path = '/user/reset';
    const req = {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
      }),
    };
    const result: IMainRes = await this.mainFetch(req, path);
    return result;
  }

  async isOurUser(username: string) {
    const path = '/user/check';
    const req = {
      method: 'GET',
      body: JSON.stringify({
        username,
      }),
    };
    const result: boolean = await this.mainFetch(req, path);
    return result;
  }

  async user(method: EMethod, token: string, username?: string, password?: string, email?: string) {
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
    const result: IMainRes | IUserInfo = await this.mainFetch(req, path);
    return result;
  }
}

export const userFetch = new UserFetch();
