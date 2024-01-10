import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import APIService from '../../../services/APIService';
import { User } from '../../../interfaces/User';
import { useCookies } from 'react-cookie';

export function useLogin() {
    const [userToken, setUserToken] = useCookies(['myToken']);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: User) => APIService.LogInUser(user).catch(err => {throw err}),
        onSuccess: (data) => {
            if (data.token && data.token !== undefined) {
                queryClient.setQueryData(['user', { type: 'auth' }], data.token);
                queryClient.invalidateQueries({ queryKey: ['user', { type: 'auth' }] });
                setUserToken('myToken', data.token);
            }
        },
        onError: (error) => {
            console.log(`An error has occurred: ${error}`);
        },
    });
}
