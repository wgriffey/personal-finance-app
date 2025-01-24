import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService from '@auth/services/AuthService.ts';
import useAuth from './useAuth';

export function useRefresh() {
    const queryClient = useQueryClient();
    const { login, logout } = useAuth();

    return useMutation({
        mutationFn: () => AuthService.refreshUserAccessToken(),
        mutationKey: ['token-refresh'],
        meta: {
            meta: { callRefresh: false },
        },
        onSuccess: () => {
            login();
        },
        onError: (error) => {
            if (error.message.includes('401')) {
                queryClient.removeQueries();
                logout();
            }
        },
    });
}
