import { useQuery } from '@tanstack/react-query';
import TransactionService from '@transactions/service/TransactionService.ts';

export function useTransactions(startDate?: string, endDate?: string) {
    return (
        useQuery({
            queryKey: ['transactions'],
            queryFn: () => TransactionService.getTransactionDataFromDB(startDate, endDate),
        }) ?? []
    );
}
