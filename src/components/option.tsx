import { ButtonHTMLAttributes } from 'react';
import { Check } from './icon';

type OptionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  select?: boolean;
};

export function Option({ children, select, className, ...props }: OptionProps) {
  return (
    <button
      data-select={select}
      className={`flex w-full justify-between rounded-lg border-2 border-transparent bg-zinc-900 p-2 px-4 text-start font-medium text-zinc-300 transition-all hover:bg-zinc-800 data-[select=true]:border-blue-600 data-[select=true]:text-blue-500 ${className}`}
      {...props}
    >
      {children}

      {select && <Check />}
    </button>
  );
}
