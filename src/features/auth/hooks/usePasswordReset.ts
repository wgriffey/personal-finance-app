import { useMutation, UseMutationResult } from '@tanstack/react-query';
import UserService from '@user/service/UserService';

export function usePasswordReset(): UseMutationResult<any, Error, string> {
    return useMutation({
        mutationFn: (email: string) => UserService.passwordReset(email),
        onError: (error: Error) => {
            console.log(error.message);
        },
    });
}
