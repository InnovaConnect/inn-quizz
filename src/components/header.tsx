type HeaderProps = {
  title?: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-6 gap-y-3 sm:flex-nowrap">
      <h1 className="w-full min-w-52 text-5xl font-bold text-zinc-300">
        InnQuizz
      </h1>

      {title && <h2 className="text-nowrap text-zinc-500">{title}</h2>}
    </header>
  );
}
