export default class TransactionService {
    static async GetTransactionDataFromPlaid(token: string) {
        return await fetch(`http://127.0.0.1:8000/api/save_transactions_from_plaid`, {
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

    static async GetTransactionDataFromDB(token: string, startDate?: string, endDate?: string) {
        return await fetch(
            `http://127.0.0.1:8000/api/get_transactions?start_date=${startDate}&end_date=${endDate}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
            },
        ).then(async (res) => {
            if (res.ok) {
                return await res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }
}
