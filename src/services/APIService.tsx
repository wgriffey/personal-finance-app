import { User } from '../interfaces/User';

export default class APIService {
    static async LogInUser(body: User) {
        return await fetch(`http://127.0.0.1:8000/api/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(async (res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }

    static async SignUpUser(body: User) {
        return await fetch(`http://127.0.0.1:8000/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(async (res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }

    static async GetAccountDataFromPlaid(token: any) {
        return await fetch(`http://127.0.0.1:8000/api/save_accounts_from_plaid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).then(async (res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }

    static async GetAccountDataFromDB(token: any) {
        return await fetch(`http://127.0.0.1:8000/api/get_accounts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).then(async (res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }

    static async GetAccountDataByIdFromDB(token: any, account_id: number) {
        return await fetch(`http://127.0.0.1:8000/api/get_account/${account_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).then(async (res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }

    static async GetTransactionDataFromPlaid(token: any) {
        return await fetch(`http://127.0.0.1:8000/api/save_transactions_from_plaid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).then(async (res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }

    static async GetTransactionDataFromDB(token: any, startDate?: string, endDate?: string) {
        return await fetch(`http://127.0.0.1:8000/api/get_transactions?start_date=${startDate}&end_date=${endDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).then(async (res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }

    static async GetInvestmentDataFromPlaid(token: any) {
        return await fetch(`http://127.0.0.1:8000/api/save_investments_from_plaid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).then(async (res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }

    static async GetInvestmentDataFromDB(token: any) {
        return await fetch(`http://127.0.0.1:8000/api/get_investments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).then(async (res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }

    static async GenerateLinkToken(token: any, itemId?: number) {
        if (itemId) {
            return await fetch('http://127.0.0.1:8000/api/create_link_token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({ item_id: itemId }),
            }).then(async (res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`${res.status}: ${await res.text()}`);
            });
        }
        return await fetch('http://127.0.0.1:8000/api/create_link_token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).then(async (res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }
}
