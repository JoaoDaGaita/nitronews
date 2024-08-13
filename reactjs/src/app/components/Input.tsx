import { forwardRef } from 'react'
import type { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error: FieldError | undefined
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...rest }, ref) => {
  return(
    // <div className='w-full flex items-center rounded-md text-gray-300 bg-[#232129]' >
      // {Icon && <Icon className='ml-4' size={20} />}
      <>
        <input {...rest} ref={ref} className='h-14 w-full p-5 text-gray-700 
            bg-transparent border border-solid rounded-lg border-orange-400 placeholder:text-gray-700' />
        <span className='text-red-400'>{error?.message}</span>
      </>
    
    )
  },
);

Input.displayName = 'Input';
