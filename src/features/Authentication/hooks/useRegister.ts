import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import APIService from '../../../services/APIService';
import { User } from '../../../interfaces/User';
import { useCookies } from 'react-cookie';
import { useLogin } from './useLogin';

export function useRegister() {
    const [userToken, setUserToken] = useCookies(['myToken']);
    const queryClient = useQueryClient();
    const loginMutation = useLogin();

    return useMutation({
        mutationFn: (user: User) => APIService.SignUpUser(user),
        onSuccess: (data) => {
            console.log(`Successful Sign Up!: ${JSON.stringify(data)}`)
        },
        onError: (error) => {
            console.log(error.message);
            if (error.message.includes('username already exists.')) {
                error.message = 'User with username already exists';
                return;
            }
            else if(error.message.includes('email already exists')){
                error.message = 'User with email already exists'
                return;
            }
        },
    });
}
