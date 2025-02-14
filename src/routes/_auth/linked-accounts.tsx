import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/linked-accounts')({
    component: LinkedAccounts,
});

function LinkedAccounts() {
    return (
        <div className='flex h-full w-full flex-col gap-2 bg-transparent'>
            <div>Linked Accounts Page</div>
        </div>
    );
}
