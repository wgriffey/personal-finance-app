import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import AccountService from '../services/AccountService.ts';

export function useAccount(accountId: number) {
    const [userToken] = useCookies(['myToken']);
    return useQuery({
        queryKey: ['accounts', accountId],
        queryFn: () => AccountService.GetAccountDataByIdFromDB(userToken['myToken'], accountId),
    });
}
