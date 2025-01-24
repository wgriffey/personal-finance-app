import { PlaidInstitution } from 'react-plaid-link';
import { fetchWithMiddleware } from '@utils/fetchMiddleware';

export default class PlaidService {
    static async generateLinkToken(itemId?: number) {
        let response;
        if (itemId) {
            response = await fetchWithMiddleware('http://127.0.0.1:8000/api/create_link_token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { itemId: itemId },
            });
        }
        response = await fetchWithMiddleware('http://127.0.0.1:8000/api/create_link_token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }

    static async setAccessToken(publicToken: string, institutionData: PlaidInstitution) {
        await fetchWithMiddleware('http://127.0.0.1:8000/api/set_access_token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: { publicToken, institutionData },
        });
    }
}
