import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface InputFieldProps {
    id: string;
    label: string;
    type?: 'text' | 'email' | 'password';
    showPassword?: boolean;
    onTogglePassword?: () => void;
    defaultValue?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ id, label, type = 'text', showPassword, onTogglePassword, defaultValue, onChange }, ref) => (
        <div className='relative'>
            <input
                ref={ref}
                type={id.includes('password') ? (showPassword ? 'text' : 'password') : type}
                id={id}
                defaultValue={defaultValue}
                onChange={onChange}
                className='peer ml-8 block w-[90%] appearance-none rounded-t-lg border-0 border-b-2 border-textColor-secondary bg-transparent px-2.5 pb-2.5 pt-5 text-sm text-textColor-secondary focus:border-textColor-primary focus:text-textColor-primary focus:outline-none focus:ring-0'
                placeholder=''
            />
            <label
                htmlFor={id}
                className='absolute start-2.5 top-4 z-10 ml-6 origin-[0] -translate-y-4 scale-75 transform text-sm text-textColor-secondary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-textColor-primary'
            >
                {label}
            </label>
            {id.includes('password') && (
                <FontAwesomeIcon
                    onClick={onTogglePassword}
                    icon={showPassword ? faEye : faEyeSlash}
                    className='absolute right-8 top-7 cursor-pointer text-textColor-secondary hover:text-textColor-primary'
                />
            )}
        </div>
    ),
);

export default InputField;