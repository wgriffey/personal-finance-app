import { useEffect, useMemo, useState } from 'react';
import { Transaction } from '../../../interfaces/Transaction';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '../../../components/DataTable/DataTable';
import { useTransactions } from '../../Transactions/hooks/useTransactions.ts';
import moment from 'moment';
import { Account } from '../../../interfaces/Account.ts';
import { useAccounts } from '../../LinkedAccounts/hooks/useAccounts.ts';

function HomeDashboardRecentTransactions() {
    const accounts = useAccounts();
    const startDate: string = moment().subtract(30, 'days').format('YYYY-MM-DD')
    const endDate: string = moment().format('YYYY-MM-DD')
    const recentTransactionColumns: ColumnDef<Transaction>[] = [
        {
            header: 'Account',
            accessorKey: 'account',
            cell: ({ row }) => {
                const account: Account = accounts.data.find((acc: Account) => acc.id === row.getValue('account'))
                return account.name
            }
        },
        {
            header: 'Date',
            accessorKey: 'date',
            cell: ({ row }) => {
                const date: Date = row.getValue('date');
                return new Date(date).toLocaleDateString();
            },
        },
        {
            header: 'Amount',
            accessorKey: 'amount',
        },
        {
            header: 'Company Name',
            accessorKey: 'name',
        },
        {
            header: 'Payment Channel',
            accessorKey: 'payment_channel',
        },
        {
            header: 'Category',
            accessorKey: 'primary_category',
        },
        {
            header: 'Sub-Category',
            accessorKey: 'detailed_category',
        },
    ];

    const transactions = useTransactions(startDate, endDate);
    const [recentTransactionsData] = useState<Transaction[]>([transactions.data]);

    const memoData: Transaction[] = useMemo(() => recentTransactionsData, [recentTransactionsData]);

    useEffect(() => {
        console.log(transactions)
        console.log(memoData)
    })

    return (
        <div
            id='home-dashboard-recent-transactions'
            className='mb-2 ml-2 w-[60%] flex-1 overflow-scroll rounded-sm border border-textColor-primary bg-backgroundColor-primary'
        >
            <strong className='p-1 font-medium text-textColor-secondary'>
                Recent Transactions
            </strong>
            {transactions.isFetching || transactions.isLoading? <h2 className={"text-textColor-primary"}>Loading...</h2> : null}
            {transactions.status === "error" ? <h2>Error Fetching Transactions</h2> : null}
            {transactions.isSuccess ? <div className='m-3 w-[90%]'>
                <DataTable columns={recentTransactionColumns} data={transactions.data} />
            </div> : null}

        </div>
    );
}

export default HomeDashboardRecentTransactions;
