import { fetchWithMiddleware } from '@utils/fetchMiddleware';

export default class TransactionService {
    static async getTransactionDataFromPlaid() {
        const response = await fetchWithMiddleware(
            `http://127.0.0.1:8000/api/save_transactions_from_plaid`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        return response.data;
    }

    static async getTransactionDataFromDB(startDate?: string, endDate?: string) {
        const response = await fetchWithMiddleware(
            `http://127.0.0.1:8000/api/get_transactions?start_date=${startDate}&end_date=${endDate}`,
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
