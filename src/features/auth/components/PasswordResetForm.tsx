import { usePasswordReset } from '@auth/hooks/usePasswordReset';
import Spinner from '@components/Spinner';
import InputField from './InputField';
import { useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

function PasswordResetRequestForm() {
    const passwordResetMutation = usePasswordReset();
    const [email, setEmail] = useState<string>('');
    const [isFormError, setIsFormError] = useState(false);
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!email) {
            setIsFormError(true);
            setFormError('Please input your email address');
        }
        passwordResetMutation.mutate(email, {
            onSuccess: () => navigate({ to: '/login' }),
        });
    }

    return (
        <form className='flex w-full flex-col items-center space-y-4' onSubmit={handleSubmit}>
            <div className='w-3/4 space-y-4 px-3'>
                <InputField
                    id='email'
                    type='email'
                    label='Email Address'
                    onChange={handleInputChange}
                />
            </div>

            {isFormError && <p className='text-md px-8 text-red-600'>{formError}</p>}
            <div className='space-y-2'>
                <button
                    type='submit'
                    disabled={passwordResetMutation.isPending}
                    className='primary-button w-56 disabled:opacity-75'
                >
                    {passwordResetMutation.isPending ? (
                        <Spinner height='h-6' width='w-6' color='border-textColor-secondary' />
                    ) : (
                        'Request Password Reset'
                    )}
                </button>
            </div>
        </form>
    );
}

export default PasswordResetRequestForm;
