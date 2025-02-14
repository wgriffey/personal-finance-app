import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/investments')({
    component: Investments,
});

function Investments() {
    return (
        <div className='flex h-full w-full flex-col gap-2 bg-transparent'>
            <div>Investments Page</div>
        </div>
    );
}
