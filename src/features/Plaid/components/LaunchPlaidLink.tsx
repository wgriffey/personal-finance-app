import { LinkProps } from '../../../interfaces/LinkProps.ts';
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from 'react-plaid-link';
import { useEffect, useCallback } from 'react';
import InvestmentService from '../../Investments/services/InvestmentService.ts';
import TransactionService from '../../Transactions/service/TransactionService.ts';
import AccountService from '../../LinkedAccounts/services/AccountService.ts';
import PlaidService from '../services/PlaidService.ts';
import useLink from '../hooks/useLink.ts';
import { useQueryClient } from '@tanstack/react-query';

function LaunchPlaidLink(linkProps: LinkProps) {
    const { deleteLinkToken } = useLink();
    const queryClient = useQueryClient();

    const onSuccess = useCallback(
        async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
            // Update Link Mode: No public token exchange or data pull
            if (linkProps.item !== null && linkProps.item !== undefined) {
                deleteLinkToken(null, parseInt(linkProps.item));
            }
            // Regular Link Mode: Exchange public token for new access token, then pull account,transaction, and investment data from Plaid
            const getAccountDataFromPlaid = () => {
                AccountService.GetAccountDataFromPlaid(linkProps.userToken)
                    .then((res) => {
                        queryClient.invalidateQueries({ queryKey: ['accounts'] });
                    })
                    .catch((err) => console.log(err));
            };

            const getTransactionDataFromPlaid = () => {
                TransactionService.GetTransactionDataFromPlaid(linkProps.userToken)
                    .then((res) => {
                        queryClient.invalidateQueries({ queryKey: ['transactions'] });
                    })
                    .catch((err) => console.log(err));
            };

            const getInvestmentDataFromPlaid = () => {
                InvestmentService.GetInvestmentDataFromPlaid(linkProps.userToken)
                    .then((res) => {
                        queryClient.invalidateQueries({ queryKey: ['investments'] });
                    })
                    .catch((err) => console.log(err));
            };

            await PlaidService.SetAccessToken(linkProps.userToken, public_token);
            
            getAccountDataFromPlaid();
            getTransactionDataFromPlaid();
            getInvestmentDataFromPlaid();

            deleteLinkToken(linkProps.userToken, null);
        },
        [deleteLinkToken, linkProps.item, linkProps.userToken],
    );
    const config: Parameters<typeof usePlaidLink>[0] = {
        token: linkProps.linkToken,
        onSuccess,
    };
    const { open, ready } = usePlaidLink(config);

    useEffect(() => {
        if (ready) {
            open();
        }
    }, [open, ready]);

    return <></>;
}

export default LaunchPlaidLink;
