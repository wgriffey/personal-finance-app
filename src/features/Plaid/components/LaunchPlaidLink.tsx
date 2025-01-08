import { LinkProps } from '@interfaces/LinkProps.ts';
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from 'react-plaid-link';
import { useEffect, useCallback } from 'react';
import InvestmentService from '@investments/services/InvestmentService.ts';
import TransactionService from '@transactions/service/TransactionService.ts';
import AccountService from '@accounts/services/AccountService.ts';
import PlaidService from '@plaid/services/PlaidService.ts';
import useLink from '@plaid/hooks/useLink.ts';
import { useQueryClient } from '@tanstack/react-query';

function LaunchPlaidLink(linkProps: LinkProps) {
    const { deleteLinkToken } = useLink();
    const queryClient = useQueryClient();

    const onSuccess = useCallback(
        async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
            // Update Link Mode: No public token exchange or data pull
            if (linkProps.item !== null && linkProps.item !== undefined) {
                deleteLinkToken(parseInt(linkProps.item));
            }
            // Regular Link Mode: Exchange public token for new access token, then pull account,transaction, and investment data from Plaid
            const getAccountDataFromPlaid = () => {
                AccountService.getAccountDataFromPlaid()
                    .then(() => {
                        queryClient.invalidateQueries({ queryKey: ['accounts'] });
                    })
                    .catch((err) => console.log(err));
            };

            const getTransactionDataFromPlaid = () => {
                TransactionService.getTransactionDataFromPlaid()
                    .then((res) => {
                        queryClient.invalidateQueries({ queryKey: ['transactions'] });
                    })
                    .catch((err) => console.log(err));
            };

            const getInvestmentDataFromPlaid = () => {
                InvestmentService.getInvestmentDataFromPlaid()
                    .then((res) => {
                        queryClient.invalidateQueries({ queryKey: ['investments'] });
                    })
                    .catch((err) => console.log(err));
            };

            await PlaidService.setAccessToken(public_token, metadata.institution!);

            getAccountDataFromPlaid();
            getTransactionDataFromPlaid();
            getInvestmentDataFromPlaid();

            deleteLinkToken();
        },
        [deleteLinkToken, linkProps.item],
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
