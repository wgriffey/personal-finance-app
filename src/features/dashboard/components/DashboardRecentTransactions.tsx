import { Transaction } from '@interfaces/Transaction.ts';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@components/DataTable';
import { useTransactions } from '@transactions/hooks/useTransactions.ts';
import moment from 'moment';
import { Account } from '@interfaces/Account.ts';
import { useAccounts } from '@accounts/hooks/useAccounts.ts';
import Spinner from '@components/Spinner';

function DashboardRecentTransactions() {
    const accounts = useAccounts();
    const startDate: string = moment().subtract(30, 'days').format('YYYY-MM-DD');
    const endDate: string = moment().format('YYYY-MM-DD');
    const recentTransactionColumns: ColumnDef<Transaction>[] = [
        {
            header: 'Account',
            accessorKey: 'account',
            cell: ({ row }) => {
                const account: Account = accounts.data.find(
                    (acc: Account) => acc.id === row.getValue('account'),
                );
                return account.name;
            },
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
            accessorKey: 'paymentChannel',
        },
        {
            header: 'Category',
            accessorKey: 'primaryCategory',
        },
        {
            header: 'Sub-Category',
            accessorKey: 'detailedCategory',
        },
    ];

    const transactions = useTransactions(startDate, endDate);

    return (
        <div
            id='home-dashboard-recent-transactions'
            className='relative mb-2 ml-2 w-[60%] rounded-sm border border-textColor-primary bg-backgroundColor-primary'
        >
            <strong className='p-1 font-medium text-textColor-secondary'>
                Recent Transactions
            </strong>
            {(transactions.isFetching || transactions.isLoading) && (
                <Spinner height='h-20' width='w-20' color='border-textColor-primary' />
            )}
            {transactions.status === 'error' ? <h2>Error Fetching Transactions</h2> : null}
            {transactions.isSuccess ? (
                <div className='m-3 w-[90%]'>
                    <DataTable columns={recentTransactionColumns} data={transactions.data} />
                </div>
            ) : null}
        </div>
    );
}

export default DashboardRecentTransactions;
