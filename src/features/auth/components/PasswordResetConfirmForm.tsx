import { usePasswordResetConfirm } from '@auth/hooks/usePasswordResetConfirm';
import Spinner from '@components/Spinner';
import { PasswordResetConfirmParams } from '@user/service/UserService';
import React, { useRef, useState } from 'react';
import InputField from './InputField';
import { useNavigate, useParams } from '@tanstack/react-router';

function PasswordResetConfirmForm() {
    const params = useParams({strict: false});
    const passwordResetConfirmMutation = usePasswordResetConfirm();
    const navigate = useNavigate();
    const [isFormError, setIsFormError] = useState(false);
    const [formError, setFormError] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);

    const formRef = useRef<PasswordResetConfirmParams>({
        uid: params.uid ?? '',
        token: params.token ?? '',
        newPassword: '',
        reNewPassword: '',
    });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = event.target;
        formRef.current[id as keyof PasswordResetConfirmParams] = value;
        setIsFormError(false);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!formRef.current.uid || !formRef.current.token) {
            navigate({ to: '/login' });
        } else if (!formRef.current.newPassword || !formRef.current.reNewPassword) {
            setIsFormError(true);
            setFormError('Please fill in all fields');
        } else if (formRef.current.newPassword !== formRef.current.reNewPassword) {
            setIsFormError(true);
            setFormError('Passwords do not match');
        } else {
            passwordResetConfirmMutation.mutate(formRef.current, {
                onSuccess: () => navigate({ to: '/login' }),
                onError: (error) => {
                    setIsFormError(true);
                    setFormError(error.message);
                },
            });
        }
    }
    return (
        <form className='flex w-full flex-col items-center space-y-4' onSubmit={handleSubmit}>
            <div className='w-3/4 space-y-4 px-3'>
                <InputField
                    id='newPassword'
                    type='password'
                    label='Password'
                    showPassword={showPasswords}
                    onTogglePassword={() => setShowPasswords(!showPasswords)}
                    onChange={handleInputChange}
                />
                <InputField
                    id='reNewPassword'
                    type='password'
                    label='Confirm Password'
                    showPassword={showPasswords}
                    onTogglePassword={() => setShowPasswords(!showPasswords)}
                    onChange={handleInputChange}
                />
            </div>

            {isFormError && <p className='text-md px-8 text-red-600'>{formError}</p>}
            <div className='space-y-2'>
                <button
                    type='submit'
                    disabled={passwordResetConfirmMutation.isPending}
                    className='primary-button w-56 disabled:opacity-75'
                >
                    {passwordResetConfirmMutation.isPending ? (
                        <Spinner height='h-6' width='w-6' color='border-textColor-secondary' />
                    ) : (
                        'Reset Password'
                    )}
                </button>
            </div>
        </form>
    );
}

export default PasswordResetConfirmForm;
