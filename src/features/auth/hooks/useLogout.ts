import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService from '@auth/services/AuthService.ts';
import useAuth from './useAuth';

export function useLogout() {
    const queryClient = useQueryClient();
    const { logout } = useAuth();

    return useMutation({
        mutationFn: () => AuthService.logout(),
        onSettled: () => {
            queryClient.removeQueries();
            logout();
        }
    });
}
