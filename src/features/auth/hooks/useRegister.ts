import { useMutation } from '@tanstack/react-query';
import { User } from '@interfaces/User.ts';
import AuthService from '@auth/services/AuthService.ts';

export function useRegister() {
    return useMutation({
        mutationFn: (user: User) => AuthService.signUp(user),
        onError: (error) => {
            console.log(error.message);
            if (error.message.includes('username already exists.')) {
                error.message = 'User with username already exists';
                return;
            } else if (error.message.includes('email already exists')) {
                error.message = 'User with email already exists';
                return;
            }
        },
    });
}
