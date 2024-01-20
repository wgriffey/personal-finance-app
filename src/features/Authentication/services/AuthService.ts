import { User } from '../../../interfaces/User.ts';

export default class AuthService {
    static async LogInUser(body: User) {
        return await fetch(`http://127.0.0.1:8000/api/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(async (res) => {
            if (res.ok) {
                return await res.json();
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
                return await res.json();
            }
            throw new Error(`${res.status}: ${await res.text()}`);
        });
    }
}
