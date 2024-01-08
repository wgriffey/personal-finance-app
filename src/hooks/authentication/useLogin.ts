import { useMutation, useQuery, useQueryClient } from 'react-query';
import APIService from '../../services/APIService';
import { User } from '../../interfaces/User';
import { useCookies } from 'react-cookie';

export function useLogin() {
    const [userToken, setUserToken] = useCookies(['myToken']);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: User) => APIService.LogInUser(user),
        onSuccess: (data) => {
            if (data.token && data.token !== undefined) {
                queryClient.setQueryData(['user'], data.token);
                queryClient.invalidateQueries('user');
                setUserToken('myToken', data.token);
            }
        },
        onError: (error) => {
            console.log(error);
        },
    });
}
