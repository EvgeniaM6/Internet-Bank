import { IMainRes } from '../data/types';
import Fetch from './mainFetch';

class ServicesFetch extends Fetch {
  async getServicesList(): Promise<IMainRes> {
    const path = '/user/services';
    const req = {
      method: 'GET',
    };
    const result: IMainRes = await this.mainFetch(req, path);
    return result;
  }
}

export const servicesFetch = new ServicesFetch();
