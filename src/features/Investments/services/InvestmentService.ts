export default class InvestmentService {
    static async GetInvestmentDataFromPlaid(token: string) {
        return await fetch(`http://127.0.0.1:8000/api/save_investments_from_plaid`, {
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

    static async GetInvestmentDataFromDB(token: string) {
        return await fetch(`http://127.0.0.1:8000/api/get_investments`, {
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
