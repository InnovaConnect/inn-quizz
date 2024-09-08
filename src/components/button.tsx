import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const buttonVariantClassName: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-500',
  secondary: 'bg-zinc-900 hover:bg-zinc-800',
  success: 'bg-green-600 hover:bg-green-500',
  error: 'bg-red-600 hover:bg-red-500'
};

export function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full rounded-lg p-2 px-4 text-center font-medium text-zinc-300 transition-all ${buttonVariantClassName[variant]} disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
}
