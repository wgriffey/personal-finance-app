import { useMutation, UseMutationResult } from '@tanstack/react-query';
import UserService, { PasswordResetConfirmParams } from '@user/service/UserService';

export function usePasswordResetConfirm(): UseMutationResult<
    any,
    Error,
    PasswordResetConfirmParams
> {
    return useMutation({
        mutationFn: (params: PasswordResetConfirmParams) =>
            UserService.passwordResetConfirm(params),
        onError: (error: Error) => {
            console.log(error.message);
        },
    });
}
