export default class AccountService {
    static async GetAccountDataFromPlaid(token: string) {
        return await fetch(`http://127.0.0.1:8000/api/save_accounts_from_plaid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).then(async (res) => {
            if (res.ok) {
                return await res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }

    static async GetAccountDataFromDB(token: string) {
        return await fetch(`http://127.0.0.1:8000/api/get_accounts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).then(async (res) => {
            if (res.ok) {
                return await res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }

    static async GetAccountDataByIdFromDB(token: string, account_id: number) {
        return await fetch(`http://127.0.0.1:8000/api/get_account/${account_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).then(async (res) => {
            if (res.ok) {
                return await res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }
}
