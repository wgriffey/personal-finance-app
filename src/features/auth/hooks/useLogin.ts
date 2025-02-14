import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@interfaces/User.ts';
import AuthService from '@auth/services/AuthService.ts';
import useAuth from './useAuth';

export function useLogin() {
    const { login } = useAuth();

    return useMutation({
        mutationFn: (user: Partial<User>) => AuthService.login(user),
        onSuccess: () => {
            login();
        },
        onError: (error) => {
            if (error.message.includes('401')) {
                error.message = 'Invalid Credentials';
            }
        },
    });
}
