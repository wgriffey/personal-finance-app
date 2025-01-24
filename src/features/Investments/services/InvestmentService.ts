import { fetchWithMiddleware } from '@utils/fetchMiddleware';

export default class InvestmentService {
    static async getInvestmentDataFromPlaid() {
        await fetchWithMiddleware(`http://127.0.0.1:8000/api/save_investments_from_plaid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static async getInvestmentDataFromDB() {
        const response = await fetchWithMiddleware(`http://127.0.0.1:8000/api/get_investments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    }
}
