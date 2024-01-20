import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import AccountService from '../services/AccountService.ts';

export function useAccounts() {
    const [userToken] = useCookies(['myToken']);

    return useQuery({
        queryKey: ['accounts'],
        queryFn: () => AccountService.GetAccountDataFromDB(userToken['myToken']),
    });
}
