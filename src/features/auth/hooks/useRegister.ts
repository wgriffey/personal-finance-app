import { useMutation } from '@tanstack/react-query';
import { User } from '@interfaces/User.ts';
import UserService from '@user/service/UserService';

export function useRegister() {
    return useMutation({
        mutationFn: (user: User) => UserService.signUp(user),
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
