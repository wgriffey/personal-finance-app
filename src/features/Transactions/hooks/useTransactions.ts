import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import TransactionService from '../service/TransactionService.ts';

export function useTransactions(startDate?: string, endDate?: string) {
    const [userToken] = useCookies(['myToken']);

    return (
        useQuery({
            queryKey: ['transactions'],
            queryFn: () =>
                TransactionService.GetTransactionDataFromDB(
                    userToken['myToken'],
                    startDate,
                    endDate,
                ),
        }) ?? []
    );
}
