import { ButtonHTMLAttributes } from 'react';

type IconButtonVariant = 'primary' | 'secondary' | 'success' | 'error';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: IconButtonVariant;
};

const iconButtonVariantClassName: Record<IconButtonVariant, string> = {
  primary:
    'text-blue-500 transition-all hover:bg-blue-500/5 hover:text-blue-400',
  secondary:
    'text-zinc-500 transition-all hover:bg-zinc-500/5 hover:text-zinc-400',
  success:
    'text-green-500 transition-all hover:bg-green-500/5 hover:text-green-400',
  error: 'text-red-500 transition-all hover:bg-red-500/5 hover:text-red-400'
};

export function IconButton({
  variant = 'primary',
  children,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={`flex size-10 min-w-10 items-center justify-center rounded-full ${iconButtonVariantClassName[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
