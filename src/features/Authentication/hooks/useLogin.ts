import { useMutation, useQueryClient } from '@tanstack/react-query';
import APIService from '../../../services/APIService';
import { User } from '../../../interfaces/User';
import { useCookies } from 'react-cookie';

export function useLogin() {
    const [userToken, setUserToken] = useCookies(['myToken']);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: User) => APIService.LogInUser(user),
        onSuccess: (data) => {
            console.log(`Success! Data: ${JSON.stringify(data)}`);
            if (data.token) {
                queryClient.setQueryData(['user', { type: 'auth' }], data.token);
                setUserToken('myToken', data.token);
            }
        },
        onError: (error) => {
            console.log(error.message);
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
