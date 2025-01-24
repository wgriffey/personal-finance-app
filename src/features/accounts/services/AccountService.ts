import { fetchWithMiddleware } from '@utils/fetchMiddleware';

export default class AccountService {
    static async getAccountDataFromPlaid() {
        const response = await fetchWithMiddleware(
            `http://127.0.0.1:8000/api/save_accounts_from_plaid`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        return response.data;
    }

    static async getAccountDataFromDB() {
        const response = await fetchWithMiddleware(`http://127.0.0.1:8000/api/get_accounts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    }

    static async getAccountDataByIdFromDB(accountId: number) {
        const response = await fetchWithMiddleware(
            `http://127.0.0.1:8000/api/get_account/${accountId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        return response.data;
    }
}
