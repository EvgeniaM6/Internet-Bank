import { IMainRes, IBank, TAdminInfo, IUserDatabase, TMethod, IUserInfo } from "../data/types";
import Fetch from "./mainFetch";

class AdminFetch extends Fetch{
    async check(token: string) {
        const path = '/admin';
        const req = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const result: IMainRes = await this.mainFetch(req, path);
        return result;
    }

    async getInfo(token: string, info: TAdminInfo, bankname?: string){
        const path = `/admin/${info}`;
        const query = bankname ? `?bankname=${bankname}` : '';
        const req = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const result: IBank | IUserDatabase | IMainRes = await this.mainFetch(req, path, query);
        return result;
    }

    async user(method: TMethod, token: string, username: string, password?: string, email?: string, isBlock?: boolean) {
        const path = '/admin/user';
        const query = method === 'GET' ? `?username=${username}` : '';
        const req: any = {
            method,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        if (method === 'POST') {
            req.body = {
                username,
                password,
                email
            }
        }
        if (method === 'PUT') {
            req.body = {
                username,
                isBlock
            }
        }
        if (method === 'DELETE') {
            req.body = {
                username,
            }
        }
        const result: IMainRes | IUserInfo = await this.mainFetch(req, path, query);
        return result;
    }
}

export const adminFetch = new AdminFetch();