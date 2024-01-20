import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import InvestmentService from '../services/InvestmentService.ts';

export function useInvestments() {
    const [userToken] = useCookies(['myToken']);

    return (
        useQuery({
            queryKey: ['transactions'],
            queryFn: () => InvestmentService.GetInvestmentDataFromDB(userToken['myToken']),
            staleTime: 10000,
        }) ?? []
    );
}
