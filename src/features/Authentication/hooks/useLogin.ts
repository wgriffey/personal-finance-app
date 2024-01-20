import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '../../../interfaces/User';
import { useCookies } from 'react-cookie';
import AuthService from '../services/AuthService.ts';

export function useLogin() {
    const [_, setUserToken] = useCookies(['myToken']);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: User) => AuthService.LogInUser(user),
        onSuccess: (data) => {
            if (data.token) {
                queryClient.setQueryData(['user', { type: 'auth' }], data.token);
                setUserToken('myToken', data.token);
            }
        },
        onError: (error) => {
            if (
                error.message.includes('password') &&
                error.message.includes('username') &&
                error.message.includes('blank')
            ) {
                error.message = 'Please provide a username and password';
            } else if (error.message.includes('username') && error.message.includes('blank')) {
                error.message = 'Please provide a username';
            } else if (error.message.includes('password') && error.message.includes('blank')) {
                error.message = 'Please provide a password';
            } else if (error.message.includes('provided credentials.')) {
                error.message = 'Invalid Credentials';
            }
        },
    });
}
