import { useQuery } from '@tanstack/react-query';
import APIService from '../../../services/APIService';
import { useCookies } from 'react-cookie';

export function useAccounts() {
    const [userToken] = useCookies(['myToken']);

    return useQuery({
        queryKey: ['accounts'],
        queryFn: () => APIService.GetAccountDataFromDB(userToken['myToken']),
        staleTime: Infinity
    })
}