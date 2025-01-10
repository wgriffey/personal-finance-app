import { useMutation, UseMutationResult } from '@tanstack/react-query';
import UserService, { ActivationParams } from '@user/service/UserService';

export function useActivation(): UseMutationResult<any, Error, ActivationParams> {
    return useMutation({
        mutationFn: (params: ActivationParams) => UserService.activation(params),
        onError: (error: Error) => {
            console.log(error.message);
        },
    });
}
