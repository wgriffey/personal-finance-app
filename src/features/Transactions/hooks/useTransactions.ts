import { useQuery } from '@tanstack/react-query';
import APIService from '../../../services/APIService';
import { useCookies } from 'react-cookie';

export function useTransactions() {
    const [userToken, setUserToken] = useCookies(['myToken']);

    return useQuery({
        queryKey: ['transactions'],
        queryFn: () => APIService.GetTransactionDataFromDB(userToken),
    });
}
