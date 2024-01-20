export default class PlaidService {
    static async GenerateLinkToken(token: string, itemId: number | null | undefined) {
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
                    console.log('successful link');
                    return await res.json();
                }
                console.log('failed link');

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
                return await res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }

    static async SetAccessToken(token: string, publicToken: string) {
        await fetch('http://127.0.0.1:8000/api/set_access_token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({ publicToken }),
        });
    }
}
