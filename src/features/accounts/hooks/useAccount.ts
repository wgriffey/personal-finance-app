import { useQuery } from '@tanstack/react-query';
import AccountService from '@accounts/services/AccountService';

export function useAccount(accountId: number) {
    return useQuery({
        queryKey: ['accounts', accountId],
        queryFn: () => AccountService.getAccountDataByIdFromDB(accountId),
    });
}
