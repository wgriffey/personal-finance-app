import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/transactions')({
    component: Transactions,
});

function Transactions() {
    return (
        <div className='flex h-full w-full flex-col gap-2 bg-transparent'>
            <div>Transactions Page</div>
        </div>
    );
}
