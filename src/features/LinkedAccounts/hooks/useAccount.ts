import { useQuery } from '@tanstack/react-query';
import APIService from '../../../services/APIService';
import { useCookies } from 'react-cookie';

export function useAccount(accountId: number) {
    const [userToken] = useCookies(['myToken']);

    return useQuery({
        queryKey: ['accounts'],
        queryFn: () => APIService.GetAccountDataByIdFromDB(userToken['myToken'], accountId),
    });
}
