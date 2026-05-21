import { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn';

type InputProps =
  | (React.InputHTMLAttributes<HTMLInputElement> & {
      state?: 'default';
      errorMessage?: never;
      label?: string;
    })
  | (React.InputHTMLAttributes<HTMLInputElement> & {
      state: 'error';
      errorMessage: string;
      label?: string;
    });

const ErrorIcon = () => (
  <svg
    aria-hidden="true"
    className="h-4 w-4 shrink-0"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      clipRule="evenodd"
    />
  </svg>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  state = 'default',
  errorMessage,
  label,
  className,
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const isError = state === 'error';

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-caption font-body font-medium text-charcoal-black"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          'w-full min-h-[44px] px-4 py-2.5',
          'rounded border bg-off-white font-body text-body text-charcoal-black',
          'placeholder:text-charcoal-black/40',
          'transition-colors',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-champagne-gold focus-visible:ring-offset-2',
          isError
            ? 'border-red-600'
            : 'border-marble-grey hover:border-charcoal-black/40',
          className
        )}
        aria-invalid={isError ? true : undefined}
        aria-describedby={isError ? errorId : undefined}
        {...props}
      />
      {isError && (
        <div
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-caption text-red-600"
        >
          <ErrorIcon />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export type { InputProps };
