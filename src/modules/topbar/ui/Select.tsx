import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: readonly SelectOption[] | SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, value, onValueChange, placeholder, className, disabled, ...props }, ref) => {
    return (
      <select
        ref={ref}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        disabled={disabled}
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'dark:border-gray-600 dark:bg-gray-800 dark:text-white',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';
