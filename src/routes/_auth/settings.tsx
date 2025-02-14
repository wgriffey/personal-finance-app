import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/settings')({
    component: Settings,
});

function Settings() {
    return (
        <div className='flex h-full w-full flex-col gap-2 bg-transparent'>
            <div>Settings Page</div>
        </div>
    );
}
