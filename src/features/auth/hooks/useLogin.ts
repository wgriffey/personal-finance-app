import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@interfaces/User.ts';
import AuthService from '@auth/services/AuthService.ts';

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: Partial<User>) => AuthService.login(user),
        onSuccess: (data) => {},
        onError: (error) => {
            if (error.message.includes('401')) {
                error.message = 'Invalid Credentials';
            }
        },
    });
}
