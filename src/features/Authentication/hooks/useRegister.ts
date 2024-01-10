import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import APIService from '../../../services/APIService';
import { User } from '../../../interfaces/User';
import { useCookies } from 'react-cookie';

export function useRegister() {
    const [userToken, setUserToken] = useCookies(['myToken']);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: User) => APIService.SignUpUser(user),
        onSuccess: (data) => {
            if (data.token && data.token !== undefined) {
                queryClient.setQueryData(['user', 'token'], data.token);
                queryClient.invalidateQueries({queryKey: ['user', 'token'], exact: true });
                setUserToken('myToken', data.token);
            }
        },
        onError: (error) => {
            console.log(error);
        },
    });
}
