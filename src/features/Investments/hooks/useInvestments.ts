import { useQuery } from '@tanstack/react-query';
import InvestmentService from '@investments/services/InvestmentService.ts';

export function useInvestments() {
    return (
        useQuery({
            queryKey: ['investments'],
            queryFn: () => InvestmentService.getInvestmentDataFromDB(),
            staleTime: 10000,
        }) ?? []
    );
}
