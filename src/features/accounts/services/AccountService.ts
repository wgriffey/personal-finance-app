import { fetchWithMiddleware } from '@utils/fetchMiddleware';

export default class AccountService {
    static async getAccountDataFromPlaid() {
        return await fetchWithMiddleware(`http://127.0.0.1:8000/api/save_accounts_from_plaid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static async getAccountDataFromDB() {
        return await fetchWithMiddleware(`http://127.0.0.1:8000/api/get_accounts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static async getAccountDataByIdFromDB(accountId: number) {
        return await fetchWithMiddleware(`http://127.0.0.1:8000/api/get_account/${accountId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
