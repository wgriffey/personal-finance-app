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

    static async googleOauthLogin(provider: string, state: string, code: string) {
        return await fetchWithMiddleware(
            `http://127.0.0.1:8000/auth/o/${provider}/?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json',
                },
            },
        );
    }

    static async refreshUserAccessToken() {
        return await fetchWithMiddleware(`http://127.0.0.1:8000/auth/jwt/refresh/`, {
            method: 'POST',
        });
    }

    static async verifyUserAccessToken() {
        return await fetchWithMiddleware(`http://127.0.0.1:8000/auth/jwt/verify/`, {
            method: 'POST',
        });
    }

    static async logout() {
        return await fetchWithMiddleware(`http://127.0.0.1:8000/auth/logout/`, {
            method: 'POST',
        });
    }
}
