import { User } from '@interfaces/User.ts';
import { fetchWithMiddleware } from '@utils/fetchMiddleware.ts';

export default class AuthService {
    static async login(body: Partial<User>) {
        return await fetchWithMiddleware(`http://127.0.0.1:8000/auth/jwt/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });
    }

    static async refreshUserAccessToken() {
        return await fetchWithMiddleware(`http://127.0.0.1:8000/auth/jwt/refresh/`, {
            method: 'POST',
        });
    }

    static async signUp(body: User) {
        return await fetchWithMiddleware(`http://127.0.0.1:8000/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });
    }
}
