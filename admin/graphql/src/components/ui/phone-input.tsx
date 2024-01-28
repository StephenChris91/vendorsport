import { Controller } from 'react-hook-form';
import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { twMerge } from 'tailwind-merge';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  note?: string;
  name: string;
  error?: string;
  type?: string;
  showLabel?: boolean;
  required?: boolean;
  control: any;
}

const PhoneNumberInput: React.FC<Props> = ({
  label,
  required,
  showLabel = true,
  error,
  className,
  inputClassName,
  disabled,
  note,
  name,
  control,
  ...rest
}) => {
  return (
    <div className={twMerge(cn('mb-5', className))}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <>
            {showLabel ? (
              <label
                htmlFor={name}
                className="mb-3 block text-sm font-semibold leading-none text-body-dark"
              >
                {label}
                {required ? <span className="ml-0.5 text-red-500">*</span> : ''}
              </label>
            ) : (
              ''
            )}
            <PhoneInput
              value={value}
              onChange={onChange}
              inputClass={twMerge(
                cn(
                  '!p-0 !pe-4 !ps-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !rounded focus:!border-accent !h-12',
                  disabled
                    ? `cursor-not-allowed !border-[#D4D8DD] !bg-[#EEF1F4] select-none`
                    : '',
                  inputClassName
                )
              )}
              dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
              aria-invalid={error ? 'true' : 'false'}
              disabled={disabled}
            />
          </>
        )}
        id={name}
        name={name}
        control={control}
        {...rest}
      />
      {note && <p className="mt-2 text-xs text-body">{note}</p>}
      {error && <p className="my-2 text-xs text-red-500 text-start">{error}</p>}
    </div>
  );
};

export default PhoneNumberInput;
