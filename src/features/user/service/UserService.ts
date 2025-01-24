import { User } from '@interfaces/User';
import { fetchWithMiddleware } from '@utils/fetchMiddleware';

export interface ActivationParams {
    uid: string;
    token: string;
}

export default class UserService {
    static async signUp(body: User) {
        await fetchWithMiddleware(`http://127.0.0.1:8000/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });
    }

    static async activation(params: ActivationParams) {
        await fetchWithMiddleware(`http://127.0.0.1:8000/users/activation/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: params,
        });
    }

    static async passwordReset(body: Partial<User>) {
        return await fetchWithMiddleware(`http://127.0.0.1:8000/users/reset_password/`, {
            method: 'POST',
            body: body,
        });
    }

    static async passwordResetConfirm(
        uid: string,
        token: string,
        newPassword: string,
        reNewPassword: string,
    ) {
        await fetchWithMiddleware(`http://127.0.0.1:8000/users/reset_password_confirm/`, {
            method: 'POST',
            body: { uid, token, newPassword, reNewPassword },
        });
    }
}
