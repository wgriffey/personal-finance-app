import { useQuery } from '@tanstack/react-query';
import APIService from '../../../services/APIService';
import { useCookies } from 'react-cookie';

export function useTransactions(startDate?: string,
                                endDate?: string) {
    const [userToken] = useCookies(['myToken']);

    return useQuery({
        queryKey: ['transactions'],
        queryFn: () => APIService.GetTransactionDataFromDB(userToken['myToken'], startDate, endDate),
        staleTime: 10000
    }) ?? [];
}
