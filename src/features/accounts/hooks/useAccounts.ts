import { useQuery } from '@tanstack/react-query';
import AccountService from '@accounts/services/AccountService';

export function useAccounts() {
    return (
        useQuery({
            queryKey: ['accounts'],
            queryFn: () => AccountService.getAccountDataFromDB(),
        }) ?? []
    );
}
